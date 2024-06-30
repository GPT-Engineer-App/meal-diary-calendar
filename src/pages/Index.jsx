import React, { useState } from 'react';
import { Container, Text, VStack, Box, Button, Input, Select } from "@chakra-ui/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meal, setMeal] = useState('');
  const [food, setFood] = useState('');
  const [entries, setEntries] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    const dateKey = selectedDate.toDateString();
    setEntries({
      ...entries,
      [dateKey]: {
        ...entries[dateKey],
        [meal]: food,
      },
    });
    setMeal('');
    setFood('');
  };

  const renderEntries = () => {
    const dateKey = selectedDate.toDateString();
    const dayEntries = entries[dateKey] || {};
    return Object.entries(dayEntries).map(([meal, food]) => (
      <Box key={meal} p={2} borderWidth={1} borderRadius="md" mb={2}>
        <Text fontWeight="bold">{meal}</Text>
        <Text>{food}</Text>
      </Box>
    ));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Food Journal</Text>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <Box p={4} borderWidth={1} borderRadius="md" width="100%">
          <Text fontSize="lg" mb={2}>Selected Date: {selectedDate.toDateString()}</Text>
          <Select placeholder="Select meal" value={meal} onChange={(e) => setMeal(e.target.value)} mb={2}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Select>
          <Input placeholder="What did you eat?" value={food} onChange={(e) => setFood(e.target.value)} mb={2} />
          <Button onClick={handleSave} colorScheme="teal">Save</Button>
        </Box>
        <Box p={4} borderWidth={1} borderRadius="md" width="100%">
          <Text fontSize="lg" mb={2}>Entries for {selectedDate.toDateString()}</Text>
          {renderEntries()}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;