import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {booksCategory, booksRelevance} from "../../../store/bookSearchingSlice";

interface SelectComponentType {
    selectType: 'category' | 'relevance'
}
export const SelectComponent:React.FC<SelectComponentType> = ({
                                                                  selectType,
                                                                  ...other
}) => {
    const relevance = useAppSelector<'relevance' | 'newest'>(state => state.books.books.booksRelevance)
    const category = useAppSelector<'all' | 'art' | 'biography' | 'computer' | 'history' | 'medical' | 'poetry'>(state => state.books.books.booksCategory)
    const dispatch = useAppDispatch()

    const handleChangeRelevance = (event: SelectChangeEvent) => {
        dispatch(booksRelevance(event.target.value as 'relevance' | 'newest'));
    }
    const handleChangeCategory = (event: SelectChangeEvent) => {
        dispatch(booksCategory(event.target.value as 'all' | 'art' | 'biography' | 'computer' | 'history' | 'medical' | 'poetry'));
    }

    return selectType === 'relevance'
        ? <Box sx={{ minWidth: 200 }}>
            <FormControl>
                <Select sx={{ minWidth: 200, height: 40}}
                    id="select-relevance"
                    value={relevance}
                    onChange={handleChangeRelevance}
                >
                    <MenuItem value={'relevance'}>relevance</MenuItem>
                    <MenuItem value={'newest'}>newest</MenuItem>
                </Select>
            </FormControl>
        </Box>
        :
        <Box sx={{ minWidth: 200}}>
            <FormControl>
                <Select sx={{ minWidth: 200, height: 40  }}
                        id="select-category"
                        value={category}
                        onChange={handleChangeCategory}
                >
                    <MenuItem value={'all'}>all</MenuItem>
                    <MenuItem value={'art'}>art</MenuItem>
                    <MenuItem value={'biography'}>biography</MenuItem>
                    <MenuItem value={'computer'}>computer</MenuItem>
                    <MenuItem value={'history'}>history</MenuItem>
                    <MenuItem value={'medical'}>medical</MenuItem>
                    <MenuItem value={'poetry'}>poetry</MenuItem>
                </Select>
            </FormControl>
        </Box>

}
