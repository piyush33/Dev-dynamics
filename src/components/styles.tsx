// DashboardStyles.tsx
import styled from 'styled-components';
import { AccountCircle } from '@mui/icons-material';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f9fc;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #333;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CompanyName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007acc;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled(AccountCircle)`
    color: #007acc;
    font-size: 40px !important;
    margin-right: 10px;
`;

export const ProfileName = styled.div`
  font-size: 16px;
  color: #333;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.nav`
  width: 200px;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  color: #007acc;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007acc;
    color: #ffffff;
  }

  svg {
    margin-right: 10px;
  }
`;

export const DashboardContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const FilterContainer = styled.div`
  width: 300px;
  margin: auto;
  padding-bottom: 20px;
`;

export const ChartContainer = styled.div`
  width: 80%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;
