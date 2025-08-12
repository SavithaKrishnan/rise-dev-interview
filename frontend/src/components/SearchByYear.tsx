import {Button, Text, FormControl, FormLabel, FormHelperText, Input, Flex, Box, Spinner} from '@chakra-ui/react'
import { useState } from "react";

function SearchByDate () {
    const [searchDate, setSearchDate] = useState(""); // input value
    const [data, setData] = useState(null); // result from API call
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // error message

    // Would add with additional time: need better error handling here for if the search_date field is blank
    const searchPresidentByDate = async () => {
        //make sure there is a search date before making api call
        if (!searchDate.trim()){
            setError("Please enter a date before searching.")
            setData(null);
            return;
        }

        // clear data + errors before making new api call
        setLoading(true);
        setError(null);
        setData(null);

        // Make api call to search_by_date endpoint
        try {
            const result = await fetch(`http://127.0.0.1:5000/api/search_by_date?search_date=${encodeURIComponent(searchDate)}`)
            if (!result.ok) {
                throw new Error(
                    "No president found. Try inputting a different date."
                );
            }
            const jsonData = await result.json();
            setData(jsonData); 
            } catch (error) {
                setError(`Error: ${error.message}`);
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
                {loading ? <Spinner size="sm" /> : "Search"}
            </Button>

            {error && (
                <Text color="red.500" marginTop={3}>
                {error}
                </Text>
            )}

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