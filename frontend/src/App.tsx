import './App.css';
import Header from './components/Header.tsx'
import Table from './components/Table.tsx'
import SearchByDate from './components/SearchByYear.tsx'
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator, Flex } from '@chakra-ui/react';


 

function App() {
  return (
    <div >
      <Header />

      <Flex marginLeft={100} marginRight={100} marginTop={10}>
        <Tabs variant='enclosed' >
          <TabList>
            <Tab fontWeight={"bold"} fontSize={20}>All Presidents</Tab>
            <Tab fontWeight={"bold"} fontSize={20}>Search By Date</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Table />
            </TabPanel>
            <TabPanel>
              <SearchByDate />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </div>
  );
}

export default App;
