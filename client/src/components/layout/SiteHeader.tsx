import React from 'react';
import { Box, Flex, Input, InputLeftElement, InputGroup, Icon } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducers';
import { logoutUser } from '../../actions/authActions';

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  logoutUser: () => dispatch(logoutUser())
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SiteHeader = ({ logoutUser, auth }: Props) => {
  console.log(auth);
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
        <Box px={5}>
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
        </Box>
      ) : (
        <Box color="brand" pl={5}>
          <Link to="/login">Login</Link>
        </Box>
      )}
    </Flex>
  );
};

export default connector(SiteHeader);
