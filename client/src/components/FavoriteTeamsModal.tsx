import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch
} from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateFavoriteTeams } from '../actions/favoritesActions';
import TeamContext from '../contexts/TeamContext';
import { Team } from '../interfaces/team';
import { RootState } from '../reducers';
import { useToast } from '@chakra-ui/core';

const mapState = (state: RootState) => ({
  favoriteTeams: state.favorites.teams
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  updateFavoriteTeams: (teams: Team[]) => dispatch(updateFavoriteTeams(teams))
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isOpen: boolean;
  onClose: () => void;
  teams?: Team[];
};

const FavoriteTeamsModal = (props: Props) => {
  const toast = useToast();
  const { isOpen, onClose, favoriteTeams = [], updateFavoriteTeams } = props;
  const { teams } = useContext(TeamContext);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(favoriteTeams);

  const addTeam = (team: Team) => {
    setSelectedTeams([...selectedTeams, team]);
  };

  const removeTeam = (team: Team) => {
    setSelectedTeams(selectedTeams.filter(t => t.id !== team.id));
  };

  const saveTeams = () => {
    updateFavoriteTeams(selectedTeams);

    toast({
      title: 'Sucess',
      description: 'My Teams successfully updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent backgroundColor="brand" color="white" opacity={0.95}>
        <ModalHeader>My Teams</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {teams.map(team => {
            const isSelected = !!selectedTeams.find((ft: Team) => ft.id === team.id);

            return (
              <Box key={team.id} mb={2}>
                <Switch
                  size="md"
                  mr={3}
                  defaultIsChecked={isSelected}
                  onChange={() => (isSelected ? removeTeam(team) : addTeam(team))}
                />
                {team.shortName}
              </Box>
            );
          })}
        </ModalBody>

        <ModalFooter pt={0}>
          <Button backgroundColor="brand-secondary" mr={3} onClick={saveTeams} size="sm">
            Save
          </Button>

          <Button
            variantColor="ghost"
            onClick={() => {
              setSelectedTeams(favoriteTeams);
              onClose();
            }}
            size="sm"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default connector(FavoriteTeamsModal);
