import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartData, ChartOptions } from 'chart.js';
import Select from 'react-select';
import FetchData from './Api.tsx';
import {
    MainContainer,
    Header,
    CompanyName,
    ProfileSection,
    ProfileImage,
    ProfileName,
    Content,
    Sidebar,
    SidebarItem,
    DashboardContent,
    FilterContainer,
    ChartContainer
} from './styles.tsx';
import { Dashboard as DashboardIcon, Analytics as AnalyticsIcon, Settings as SettingsIcon } from '@mui/icons-material';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    TimeScale
);

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const activityData: any = await FetchData();
            setData(activityData.data);
        };
        fetchData();
    }, []);

    const handleFilterChange = (selectedOption: any) => {
        setFilter(selectedOption ? selectedOption.value : null);
    };

    const getFilteredData = (data: any, filter: string) => {
        if (!filter) return data;
        return {
            ...data,
            AuthorWorklog: {
                ...data.AuthorWorklog,
                rows: data.AuthorWorklog.rows.filter((row: any) => row.name === filter),
            },
        };
    };

    const filteredData = data ? getFilteredData(data, filter) : null;

    if (!filteredData) {
        return <div>Loading...</div>;
    }

    const { activityMeta, rows } = filteredData.AuthorWorklog;
    const developers = data?.AuthorWorklog.rows.map((row: any) => row.name) || [];

    const chartData: ChartData<'line'> = {
        labels: rows[0].dayWiseActivity.map((activity: any) => activity.date),
        datasets: activityMeta.map((meta: any) => ({
            label: meta.label,
            data: rows[0].dayWiseActivity.map((day: any) => {
                const activity = day.items.children.find((item: any) => item.label === meta.label);
                return activity ? parseInt(activity.count, 10) : 0;
            }),
            borderColor: meta.fillColor,
            fill: false,
        })),
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || '';
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <MainContainer>
            <Header>
                <CompanyName>Dev-Dynamics</CompanyName>
                <ProfileSection>
                    <ProfileImage />
                    <ProfileName>John Doe</ProfileName>
                </ProfileSection>
            </Header>
            <Content>
                <Sidebar>
                    <SidebarItem>
                        <DashboardIcon />
                        Dashboard
                    </SidebarItem>
                    <SidebarItem>
                        <AnalyticsIcon />
                        Analytics
                    </SidebarItem>
                    <SidebarItem>
                        <SettingsIcon />
                        Settings
                    </SidebarItem>
                </Sidebar>
                <DashboardContent>
                    <h1 style={{ textAlign: "center" }}>Developer Activity Dashboard</h1>
                    <FilterContainer>
                        <Select
                            options={developers.map((dev: string) => ({ value: dev, label: dev }))}
                            isClearable
                            onChange={handleFilterChange}
                            placeholder="Filter by developer"
                        />
                    </FilterContainer>
                    <ChartContainer>
                        <Line data={chartData} options={options} />
                    </ChartContainer>
                </DashboardContent>
            </Content>
        </MainContainer>
    );
};

export default Dashboard;
