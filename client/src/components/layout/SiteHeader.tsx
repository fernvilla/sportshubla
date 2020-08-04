import React, { FC } from 'react';
// import { Team } from '../../interfaces/team';
import { Box, Image, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducers';
import { logoutUser } from '../../actions/authActions';

type TeamProps = {
  // teams: Team[];
};

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  logoutUser: () => dispatch(logoutUser())
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & TeamProps;

const SiteHeader: FC<Props> = ({ logoutUser, auth }) => {
  return (
    <Box w="100%" px={5} py={2} bg="gray.800">
      <Flex justify="space-between" align="center">
        <Link to="/">
          <Image
            src="/images/logo/logo-transparent.png"
            alt="logo"
            title="logo"
            height="30px"
            ignoreFallback
          />
        </Link>

        {auth.isAuthenticated && (
          <Box px={5}>
            <Link to="#" onClick={() => logoutUser()}>
              Logout
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default connector(SiteHeader);
