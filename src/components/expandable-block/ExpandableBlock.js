import './ExpandableBlock.scss';
import ArrowUpSvg from '../../resources/arrow_up.svg'
import ArrowDownSvg from '../../resources/arrow_down.svg'
import { useState } from 'react';

export default function ExpandableBlock(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    function expand() {
        setIsExpanded(prev => !prev);
    }

    return (
        <div className='expandable-block' onClick={expand}>
            <div className='flex-block interactable'>
                <span className='text-expand'><b>{ props.title }</b></span>
                <img src={ isExpanded ? ArrowDownSvg : ArrowUpSvg }></img>
            </div>
            {
                isExpanded &&
                <div className='content'>
                    { props.children }
                </div>
            }
        </div>
    )
}