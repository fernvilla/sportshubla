import React, { useState } from 'react';
import {
  Box,
  Flex,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Image,
  PseudoBox,
  InputGroup,
  Icon,
  Input,
  InputLeftElement,
  Link,
  Heading
} from '@chakra-ui/core';
import { Team } from '../../interfaces/team';
import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { logoutUser } from '../../actions/authActions';
import { connect, ConnectedProps } from 'react-redux';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';
import { FaHome, FaTwitterSquare, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';

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
  // const { teams, auth, logoutUser } = props;
  const { teams, location } = props;
  // const [show, setShow] = useState(false);

  // const handleToggle = () => setShow(!show);

  return (
    <Box as="nav" color="brand" bg="white">
      <Box maxW={CONTENT_WRAPPER_WIDTH} mx="auto" py={3} px={5}>
        <Flex align="center" justify="space-between" wrap="wrap">
          <Flex alignItems="center">
            <Box>
              <RouterLink to="/">
                <Image
                  src="/images/logo/original/logo-transparent.png"
                  alt="logo"
                  title="logo"
                  ignoreFallback
                  height={100}
                />
              </RouterLink>
            </Box>

            <Box pl={3} maxW="300px">
              <Heading
                as="h1"
                fontSize="lg"
                color="blue.800"
                lineHeight="1.25em"
                fontWeight="normal"
                fontFamily="SpecialElite"
              >
                Stay up to date with everything L.A. sports
              </Heading>
            </Box>
          </Flex>

          <Box flex="0 1 250px">
            <Flex fontSize="2xl" color="blue.700" mb={3} justifyContent="flex-end">
              <Link href="https://twitter.com/SportsHubLA" isExternal>
                <Box mr={2}>
                  <FaTwitterSquare />
                </Box>
              </Link>

              <Link href="https://www.facebook.com/sportshubla" isExternal>
                <Box mr={2}>
                  <FaFacebookSquare />
                </Box>
              </Link>

              <Link href="https://www.instagram.com/sportshubla" isExternal>
                <Box mr={2}>
                  <FaInstagramSquare />
                </Box>
              </Link>
            </Flex>

            <InputGroup size="sm">
              <InputLeftElement children={<Icon name="search" color="gray.400" size="15px" />} />
              <Input placeholder="Search" bg="gray.200" rounded="md" />
            </InputGroup>
          </Box>

          {/* <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
            <svg fill="brand" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>

          <Box
            display={{ xs: show ? 'block' : 'none', sm: show ? 'block' : 'none' }}
            width={{ sm: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
          >
            <Menu>
              <MenuButton>Teams</MenuButton>

              <MenuList>
                {teams.map(team => {
                  // const teamIsSelected = location.pathname === `/teams/${team.slug}`;

                  return (
                    <Link key={team.id} to={`/teams/${team.slug}`}>
                      <MenuItem>{team.shortName}</MenuItem>
                    </Link>
                  );
                })}
              </MenuList>
            </Menu>
          </Box>*/}
        </Flex>
      </Box>

      <Box bg="brand" w="100%">
        <Flex
          color="white"
          maxW={CONTENT_WRAPPER_WIDTH}
          mx="auto"
          alignItems="center"
          px={5}
          flexWrap="wrap"
        >
          <RouterLink to="/">
            <PseudoBox
              px={3}
              py={3}
              fontSize="lg"
              height="45px"
              display="flex"
              alignItems="center"
              _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
              {...(location.pathname === `/` ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
            >
              <FaHome />
            </PseudoBox>
          </RouterLink>

          {teams.map(team => {
            const teamIsSelected = location.pathname === `/teams/${team.slug}`;

            return (
              <RouterLink key={team.id} to={`/teams/${team.slug}`}>
                <PseudoBox
                  px={3}
                  py={3}
                  height="45px"
                  display="flex"
                  alignItems="center"
                  _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                  {...(teamIsSelected ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
                >
                  {team.shortName}
                </PseudoBox>
              </RouterLink>
            );
          })}

          {/* <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
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
          </Box> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default withRouter(connector(Navbar));
