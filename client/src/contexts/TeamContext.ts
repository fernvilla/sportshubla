import { createContext } from 'react';
import { Team } from '../interfaces/team';

const TeamContext = createContext<{ teams: Team[] }>({ teams: [] });

export default TeamContext;
