import React, { FC } from 'react';
// import { Team } from '../../interfaces/team';
import { Box, Flex, Input, InputLeftElement, InputGroup, Icon } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducers';
import { logoutUser } from '../../actions/authActions';

// type TeamProps = {
//   // teams: Team[];
// };

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  logoutUser: () => dispatch(logoutUser())
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SiteHeader: FC<Props> = ({ logoutUser, auth }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      w="100%"
      px={10}
      py={2}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
      height="55px"
    >
      <Box flex="0 1 250px">
        <InputGroup size="sm">
          <InputLeftElement children={<Icon name="search" color="gray.400" size="15px" />} />
          <Input placeholder="Search" bg="gray.200" rounded="md" />
        </InputGroup>
      </Box>

      {auth.isAuthenticated ? (
        <Box px={5} color="red">
          <Flex align="center">
            {auth.user.isAdmin && (
              <Box pl={5}>
                <Link to="/admin">Admin</Link>
              </Box>
            )}

            <Box pl={5}>
              <Link to="#" onClick={() => logoutUser()}>
                Logout
              </Link>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box pl={5}>
          <Link to="/login">Login</Link>
        </Box>
      )}
    </Flex>
  );
};

export default connector(SiteHeader);
