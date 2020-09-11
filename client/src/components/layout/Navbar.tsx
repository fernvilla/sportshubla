import React, { useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import { Link as RouterLink, RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { logoutUser } from '../../actions/authActions';
import { connect, ConnectedProps } from 'react-redux';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';
import {
  FaHome,
  FaTwitterSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaChevronDown
} from 'react-icons/fa';
import Sticky from 'react-stickynode';

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
  // const { teams, location, auth, logoutUser } = props;
  const { teams, location } = props;
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const params = new URLSearchParams();

      params.append('q', searchQuery);

      history.push(`/search?${params.toString()}`);
    }
  };

  return (
    <Box as="nav" color="brand" bg="white">
      <Box maxW={CONTENT_WRAPPER_WIDTH} mx="auto" py={3} px={3}>
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

            <Box pl={3} maxW="300px" display={{ xs: 'none', md: 'block' }}>
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

          <Box flex="0 1 260px">
            <Flex fontSize="2xl" color="blue.700" mb={3} justifyContent="flex-end">
              <Link href="https://twitter.com/SportsHubLA" isExternal title="Twitter">
                <PseudoBox mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaTwitterSquare />
                </PseudoBox>
              </Link>

              <Link href="https://www.facebook.com/sportshubla" isExternal title="Facebook">
                <PseudoBox mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaFacebookSquare />
                </PseudoBox>
              </Link>

              <Link href="https://www.instagram.com/sportshubla" isExternal title="Instagram">
                <PseudoBox mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaInstagramSquare />
                </PseudoBox>
              </Link>

              <Link href="https://www.linkedin.com/company/sportshubla" isExternal title="Linkedin">
                <PseudoBox mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaLinkedin />
                </PseudoBox>
              </Link>
            </Flex>

            <InputGroup size="sm">
              <InputLeftElement children={<Icon name="search" color="gray.400" size="15px" />} />
              <Input
                placeholder="Search articles, videos, tweets..."
                bg="gray.200"
                rounded="md"
                _focus={{ bg: 'white', border: '1px', borderColor: 'blue.700' }}
                onChange={onChange}
                onKeyDown={keyPress}
              />
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

      <Sticky enabled innerZ={1000}>
        <Box bg="brand" w="100%">
          <Flex color="white" maxW={CONTENT_WRAPPER_WIDTH} mx="auto" pl={3}>
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

            <Box display={{ sm: 'block', md: 'none' }}>
              <Menu autoSelect={false}>
                <MenuButton
                  px={3}
                  py={3}
                  display="flex"
                  alignItems="center"
                  _focus={{ outline: 0, boxShadow: 'outline' }}
                >
                  Teams
                  <Box pl={1} fontSize="10px" mb="-2px">
                    <FaChevronDown />
                  </Box>
                </MenuButton>

                <MenuList bg="brand">
                  {teams.map(team => {
                    const teamIsSelected = location.pathname === `/teams/${team.slug}`;

                    return (
                      <RouterLink key={team.id} to={`/teams/${team.slug}`}>
                        <MenuItem
                          _hover={{ borderColor: 'blue.700', bg: 'blue.700', color: 'blue.700' }}
                          {...(teamIsSelected ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
                        >
                          {team.shortName}
                        </MenuItem>
                      </RouterLink>
                    );
                  })}
                </MenuList>
              </Menu>
            </Box>

            <Box
              display={{ xs: 'none', md: 'flex' }}
              width={{ sm: 'full', md: 'auto' }}
              alignItems="center"
              flexGrow={1}
              flexWrap="wrap"
            >
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
            </Box>

            <Box ml="auto">
              <Flex>
                <RouterLink to="/articles">
                  <PseudoBox
                    px={3}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/articles`
                      ? { borderColor: 'blue.700', bg: 'blue.700' }
                      : {})}
                  >
                    Articles
                  </PseudoBox>
                </RouterLink>

                <RouterLink to="/videos">
                  <PseudoBox
                    px={3}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/videos`
                      ? { borderColor: 'blue.700', bg: 'blue.700' }
                      : {})}
                  >
                    Videos
                  </PseudoBox>
                </RouterLink>

                <RouterLink to="/tweets">
                  <PseudoBox
                    px={3}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/tweets`
                      ? { borderColor: 'blue.700', bg: 'blue.700' }
                      : {})}
                  >
                    Tweets
                  </PseudoBox>
                </RouterLink>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Sticky>
    </Box>
  );
};

export default withRouter(connector(Navbar));
