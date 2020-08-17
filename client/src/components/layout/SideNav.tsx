import React, { useState } from 'react';
import { Team } from '../../interfaces/team';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Flex, PseudoBox, Text } from '@chakra-ui/core';
import {
  // FaBasketballBall,
  // FaBaseballBall,
  // FaHockeyPuck,
  // FaFutbol,
  // FaFootballBall,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';

// const leagueIconMap = new Map([
//   ['NBA', FaBasketballBall],
//   ['MLB', FaBaseballBall],
//   ['WNBA', FaBasketballBall],
//   ['NHL', FaHockeyPuck],
//   ['MLS', FaFutbol],
//   ['NFL', FaFootballBall],
//   ['NCAA', FaFootballBall]
// ]);

type Props = RouteComponentProps & {
  teams: Team[];
  location: Location;
};

const TEAMS = 'teams';

const SideNav = (props: Props) => {
  const { teams, location } = props;
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<Array<string>>([TEAMS]);
  const selectedKey = location.pathname;
  const teamsMenuIsSelected = openKeys.includes(TEAMS);

  // useEffect(() => {
  //   if (selectedKey === '/') {
  //     setOpenKeys([]);
  //   } else {
  //     const selectedParentLeague = leagues.find(l =>
  //       l.teams.find(t => `/teams/${t.slug}` === selectedKey)
  //     );

  //     if (selectedParentLeague) setOpenKeys([selectedParentLeague.shortName]);
  //   }
  // }, [leagues, selectedKey]);

  const onMenuToggle = (menu: string) => {
    if (openKeys.includes(menu)) {
      setOpenKeys(openKeys.filter(k => k !== menu));
    } else {
      setOpenKeys([...openKeys, menu]);
    }
  };

  return (
    <Box bg="brand" h="100%">
      <Flex height="55px" align="center" justify="center">
        <Box px={3}>
          <Link to="/">
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Sports Hub L.A.
            </Text>
            {/* <Image src="/images/logo/logo-transparent.png" alt="logo" title="logo" ignoreFallback /> */}
          </Link>
        </Box>
      </Flex>

      <Box as="ul">
        <PseudoBox
          as="li"
          cursor="pointer"
          _hover={{ color: 'white' }}
          transition="all 0.5s ease"
          color={teamsMenuIsSelected ? 'white' : 'gray.400'}
        >
          <Box px={6} height="40px" lineHeight="40px" onClick={() => onMenuToggle(TEAMS)}>
            <Flex align="center" justify="space-between">
              <Box>Teams</Box>

              <Box
                as={teamsMenuIsSelected ? FaChevronUp : FaChevronDown}
                fontSize="xs"
                fontWeight="medium"
              />
            </Flex>
          </Box>

          <Box as="ul" display={teamsMenuIsSelected ? 'block' : 'none'}>
            {teams.map(team => {
              // const icon = leagueIconMap.get(league.shortName);
              const teamIsSelected = selectedKey === `/teams/${team.slug}`;

              return (
                <PseudoBox
                  key={team.id}
                  as="li"
                  cursor="pointer"
                  _hover={{ color: 'white' }}
                  transition="color 0.5s ease"
                  color={teamIsSelected ? 'white' : 'gray.400'}
                  bg={teamIsSelected ? 'blue.500' : 'black'}
                >
                  <Link to={`/teams/${team.slug}`} key={team.id}>
                    <Box px={6} height="40px" lineHeight="40px">
                      {team.shortName}
                    </Box>
                  </Link>
                </PseudoBox>
              );
            })}
          </Box>
        </PseudoBox>
      </Box>
    </Box>
  );
};

export default withRouter(SideNav);
