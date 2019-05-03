import React from 'react';
import {connectSearchBox} from 'react-instantsearch-dom';


const WarfareSearchBar =
    ({
         currentRefinement, isSearchStalled, refine
     }) => {
        return (
            <>
                <div className="ui massive icon input fluid" style={{marginBottom: '10px'}}>
                    <div style={{width: '65px', height: '65px', marginRight: '10px'}}>
                        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <path
                                    d="M6.502 0h36.379c3.58 0 6.502 2.92 6.502 6.529v36.53c0 3.596-2.908 6.528-6.502 6.528H6.502C2.922 49.587 0 46.669 0 43.06V6.512C0 2.92 2.905 0 6.502 0"
                                    fill="#008080"/>
                                <path
                                    d="M29.837 11.07v-1.7c0-1.189-.96-2.152-2.144-2.151h-4.998a2.148 2.148 0 0 0-2.144 2.15v1.746c0 .195.18.33.375.285a15.564 15.564 0 0 1 4.35-.615 15.8 15.8 0 0 1 4.201.57.29.29 0 0 0 .36-.285M16.14 13.295l-.854-.857a2.138 2.138 0 0 0-3.03 0l-1.021 1.022a2.147 2.147 0 0 0 0 3.04l.84.843c.135.134.33.103.45-.031a16.46 16.46 0 0 1 1.635-1.926 15.523 15.523 0 0 1 1.935-1.653c.15-.09.164-.302.045-.438m9.12 5.399v7.355c0 .21.227.362.42.256l6.513-3.384c.148-.074.193-.256.12-.405a8.097 8.097 0 0 0-6.752-4.107c-.15 0-.3.12-.3.285m0 17.719c-5.43 0-9.842-4.424-9.842-9.868s4.412-9.866 9.842-9.866c5.432 0 9.842 4.422 9.842 9.866s-4.395 9.868-9.842 9.868m0-23.884c-7.712 0-13.967 6.272-13.967 14.016 0 7.746 6.255 14.004 13.967 14.004 7.712 0 13.967-6.273 13.967-14.018 0-7.746-6.24-14.002-13.967-14.002"
                                    fill="#FFF"/>
                            </g>
                        </svg>
                    </div>
                    <input
                        type="search"
                        placeholder="Search..."
                        value={currentRefinement}
                        onChange={event => refine(event.currentTarget.value)}

                    />
                    {isSearchStalled ? 'Loading...' : ''}
                    <i className="search icon"/>
                </div>
            </>
        );
    };

export default connectSearchBox(WarfareSearchBar);
