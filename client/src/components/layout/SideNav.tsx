import React, { FC, useState, useEffect } from 'react';
import { League } from '../../interfaces/league';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Image, Box, Flex, PseudoBox } from '@chakra-ui/core';
import {
  FaBasketballBall,
  FaBaseballBall,
  FaHockeyPuck,
  FaFutbol,
  FaFootballBall,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';

const leagueIconMap = new Map([
  ['NBA', FaBasketballBall],
  ['MLB', FaBaseballBall],
  ['WNBA', FaBasketballBall],
  ['NHL', FaHockeyPuck],
  ['MLS', FaFutbol],
  ['NFL', FaFootballBall],
  ['NCAA', FaFootballBall]
]);

type Props = RouteComponentProps & {
  leagues: League[];
  location: Location;
};

const SideNav: FC<Props> = props => {
  const { leagues, location } = props;
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const selectedKey = location.pathname;

  useEffect(() => {
    if (selectedKey === '/') {
      setOpenKeys([]);
    } else {
      const selectedParentLeague = leagues.find(l =>
        l.teams.find(t => `/teams/${t.slug}` === selectedKey)
      );

      if (selectedParentLeague) setOpenKeys([selectedParentLeague.shortName]);
    }
  }, [leagues, selectedKey]);

  const onMenuToggle = (leagueName: string) => {
    if (openKeys.includes(leagueName)) {
      setOpenKeys(openKeys.filter(k => k !== leagueName));
    } else {
      setOpenKeys([...openKeys, leagueName]);
    }
  };

  return (
    <Box bg="gray.800" h="100%">
      <Flex height="55px" align="center" justify="center">
        <Box px={3}>
          <Link to="/">
            <Image src="/images/logo/logo-transparent.png" alt="logo" title="logo" ignoreFallback />
          </Link>
        </Box>
      </Flex>

      <Box as="ul">
        {leagues.map(league => {
          const icon = leagueIconMap.get(league.shortName);
          const leagueIsSelected = openKeys.includes(league.shortName);

          return (
            <PseudoBox
              key={league.id}
              as="li"
              cursor="pointer"
              _hover={{ color: 'white' }}
              transition="all 0.5s ease"
              color={leagueIsSelected ? 'white' : 'gray.400'}
            >
              <Box
                px={6}
                my={1}
                height="40px"
                lineHeight="40px"
                onClick={() => onMenuToggle(league.shortName)}
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Box as={icon} fontSize="16px" />
                    <Box pl={3}>{league.shortName}</Box>
                  </Flex>

                  <Box
                    as={leagueIsSelected ? FaChevronUp : FaChevronDown}
                    fontSize="xs"
                    fontWeight="medium"
                  />
                </Flex>
              </Box>

              <Box as="ul" display={leagueIsSelected ? 'block' : 'none'}>
                {league.teams.map(team => {
                  const teamIsSelected = selectedKey === `/teams/${team.slug}`;

                  return (
                    <PseudoBox
                      key={league.id}
                      as="li"
                      cursor="pointer"
                      _hover={{ color: 'white' }}
                      transition="color 0.5s ease"
                      color={teamIsSelected ? 'white' : 'gray.400'}
                    >
                      <Link to={`/teams/${team.slug}`} key={team.id}>
                        <Box
                          px={6}
                          my={1}
                          height="40px"
                          lineHeight="40px"
                          bg={teamIsSelected ? 'blue.500' : 'gray.900'}
                        >
                          {team.shortName}
                        </Box>
                      </Link>
                    </PseudoBox>
                  );
                })}
              </Box>
            </PseudoBox>
          );
        })}
      </Box>
    </Box>
  );
};

export default withRouter(SideNav);
