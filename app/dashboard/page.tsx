import React from 'react';
import { Flex, Heading, Text, Grid, GridItem, Box, VStack, Avatar } from '@chakra-ui/react';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <Flex direction="column" className="dashboard-container mb-[500px]" bg="gray.200">
      {/* Welcome Message */}
      <Text className="message">Welcome, <Text as="span" color="blue">John Doe!</Text></Text>

      <VStack spacing="6" className="grid-container">
        <Heading className="section-title">Dashboard</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem className="grid-item">
            {/* Semester */}
            <Box>
              <Heading className="item-title">Semester</Heading>
              <Text className="item-info"> <Text as="span" color="Indigo">Semester: 1st</Text></Text>
            </Box>
          </GridItem>
          <GridItem className="grid-item">
            {/* Department */}
            <Box>
              <Heading className="item-title">Department</Heading>
              <Text className="item-info"><Text as="span" color="Indigo">CSE</Text></Text>
            </Box>
          </GridItem>
          <GridItem className="grid-item">
            {/* Upcoming Events */}
            <Box>
              <Heading className="item-title">Upcoming Events</Heading>
              <Text className="item-info"><Text as="span" color="Indigo">2 New Events</Text></Text>
            </Box>
          </GridItem>
        </Grid>

        {/* Larger Card for User Information */}
       

        {/* New Elements */}
       
      </VStack>
    </Flex>
  );
};

export default Dashboard;