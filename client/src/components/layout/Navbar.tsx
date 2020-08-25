import React, { useState } from 'react';
import { Box, Heading, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';
import { Team } from '../../interfaces/team';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { logoutUser } from '../../actions/authActions';
import { connect, ConnectedProps } from 'react-redux';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  logoutUser: () => dispatch(logoutUser())
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux &
  RouteComponentProps & {
    teams: Team[];
    location: Location;
  };

const Navbar = (props: Props) => {
  const { teams, auth, logoutUser } = props;
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Box
      as="nav"
      color="brand"
      bg="white"
      py={3}
      px={5}
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
    >
      <Box maxW={CONTENT_WRAPPER_WIDTH} mx="auto">
        <Flex align="center" justify="space-between" wrap="wrap">
          <Flex align="center" mr={5}>
            <Heading as="h1" size="md">
              <Link to="/">Sports Hub L.A.</Link>
            </Heading>
          </Flex>

          <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
            <svg fill="brand" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>

          <Box
            display={{ sm: show ? 'block' : 'none', md: 'flex' }}
            width={{ sm: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
          >
            <Menu>
              <MenuButton>Teams</MenuButton>

              <MenuList>
                {teams.map(team => (
                  <Link key={team.id} to={`/teams/${team.slug}`}>
                    <MenuItem>{team.shortName}</MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          </Box>

          <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
            <Box>
              {auth.isAuthenticated ? (
                <Flex align="center">
                  {auth.user.isAdmin && (
                    <Box color="brand" pl={5}>
                      <Link to="/admin">Admin</Link>
                    </Box>
                  )}

                  <Box color="brand" pl={5}>
                    <Link to="#" onClick={() => logoutUser()}>
                      Logout
                    </Link>
                  </Box>
                </Flex>
              ) : (
                <Box color="brand" pl={5}>
                  <Link to="/login">Login</Link>
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default withRouter(connector(Navbar));
