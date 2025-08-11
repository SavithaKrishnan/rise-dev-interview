import {Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Center, Flex, Box} from '@chakra-ui/react'
import { useState, useEffect } from "react";


function SearchByDate () {
    const [searchDate, setSearchDate] = useState();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    const searchPresidentByDate = async () => {
        if (!searchDate.trim())
        setLoading(true);
        setData("");

        console.log(searchDate)
        try {
            const result = await fetch(`http://127.0.0.1:5000/api/search_by_date?search_date=${encodeURIComponent(searchDate)}`)
            if (!result.ok) {
                throw new Error(`No president found. Try inputting a different date.`);
            }
            const data = await result.json();
            setData(data); 
            console.log(data)
            } catch (error) {
            setData(`Error: ${error.message}`);
            } finally {
            setLoading(false);
            }
        }

    return (
        <Flex marginLeft={5} marginTop={5} minWidth={200} flexDirection={"column"}>
            <FormControl marginBottom={2}>
            <FormLabel fontWeight={"bold"} fontSize={18}>Search Presidents by Year</FormLabel>
            <FormHelperText>Enter a date and hit the Search button below to see which president was in office on that date.</FormHelperText>
            <Input type='date' onChange={(val)=>setSearchDate(val.target.value)}/>
            </FormControl>
            <Button 
                variant='ghost' 
                fontSize={15} 
                onClick={searchPresidentByDate}
                disabled={loading}> 
                Search
            </Button>
            {
                data && (
                    <Box minWidth={585} maxWidth={585} marginTop={5} background={"#f4f4f4"} padding={2}>
                        {data['President']} served as president from {data['Term Start']} to {data['Term End']} for a tenure of {data['Tenure Length']}. He represented the {data['Party']} party.
                    </Box>
                )
            }
        </Flex>
    )
}

export default SearchByDate;

/*style={{
                            background: "#f4f4f4",
                            padding: "10px",
                            marginTop: "10px",
                            overflowX: "auto"
                        }}
*/