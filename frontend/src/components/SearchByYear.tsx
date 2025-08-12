import {Button, FormControl, FormLabel, FormHelperText, Input, Flex, Box} from '@chakra-ui/react'
import { useState } from "react";

function SearchByDate () {
    const [searchDate, setSearchDate] = useState();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    //need better error handling here for if the search_date field is blank
    const searchPresidentByDate = async () => {
        if (!searchDate.trim()){
            setLoading(true);
            setData("");
        }

        // get president from search_by_date endpoint
        try {
            const result = await fetch(`http://127.0.0.1:5000/api/search_by_date?search_date=${encodeURIComponent(searchDate)}`)
            if (!result.ok) {
                throw new Error(`No president found. Try inputting a different date.`);
            }
            const data = await result.json();
            setData(data); 
            } catch (error) {
            setData(`Error: ${error.message}`);
            } finally {
            setLoading(false);
            }
        }

    return (
        <Flex marginLeft={5} marginTop={5} minWidth={200} maxWidth={500} flexDirection={"column"}>
            <FormControl marginBottom={2}>
            <FormLabel fontWeight={"bold"} fontSize={18}>Search Presidents by Year</FormLabel>
            <FormHelperText paddingBottom={1}>Enter a date and hit the Search button below to see which president was in office on that date.</FormHelperText>
            <Input type='date' onChange={(val)=>setSearchDate(val.target.value)}/>
            </FormControl>
            <Button 
                variant='ghost' 
                fontSize={15} 
                onClick={searchPresidentByDate}
                disabled={loading}
                bg={"blue.500"}
                color={"white"}> 
                Search
            </Button>
            {
                data && (
                    <Box minWidth={500} maxWidth={500} marginTop={5} background={"#f4f4f4"} padding={2}>
                        {data['President']} served as president from {data['Term Start']} to {data['Term End']} for a tenure of {data['Tenure Length']}. He represented the {data['Party']} party.
                    </Box>
                )
            }
        </Flex>
    )
}

export default SearchByDate;