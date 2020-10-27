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
import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { addFavoriteTeam, removeFavoriteTeam } from '../actions/favoritesActions';
import TeamContext from '../contexts/TeamContext';
import { Team } from '../interfaces/team';
import { RootState } from '../reducers';

const mapState = (state: RootState) => ({
  favoriteTeams: state.favorites.teams
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  addFavoriteTeam: (team: Team) => dispatch(addFavoriteTeam(team)),
  removeFavoriteTeam: (team: Team) => dispatch(removeFavoriteTeam(team))
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isOpen: boolean;
  onClose: () => void;
  teams?: Team[];
};

const FavoriteTeamsModal = (props: Props) => {
  const { teams } = useContext(TeamContext);
  const { isOpen, onClose, favoriteTeams = [], addFavoriteTeam, removeFavoriteTeam } = props;
  console.log(favoriteTeams);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent backgroundColor="brand" color="white" opacity={0.95}>
        <ModalHeader>My Teams</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {teams.map(team => {
            const isFavorite = !!favoriteTeams.find(ft => ft.id === team.id);

            return (
              <Box key={team.id} mb={2}>
                <Switch
                  size="md"
                  mr={3}
                  defaultIsChecked={isFavorite}
                  onChange={() => (isFavorite ? removeFavoriteTeam(team) : addFavoriteTeam(team))}
                />
                {team.shortName}
              </Box>
            );
          })}
        </ModalBody>

        <ModalFooter pt={0}>
          <Button variantColor="brand-secondary" onClick={onClose} size="sm">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default connector(FavoriteTeamsModal);
