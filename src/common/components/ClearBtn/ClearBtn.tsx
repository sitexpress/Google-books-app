import React from 'react'
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear'

import s from './ClearBtn.module.css'


interface ClearBtnType {
    setInputValue: (value:string) => void
}
export const ClearBtn:React.FC<ClearBtnType> = ({setInputValue, ...other}) => {

    return <Button className={s.btn}
                   variant="text"
                   onClick={() => setInputValue('')}
                   style={{ backgroundColor: 'transparent' }}
                   title="Clear"
    >
        <ClearIcon className={s.btn_icon}/>
    </Button>
}