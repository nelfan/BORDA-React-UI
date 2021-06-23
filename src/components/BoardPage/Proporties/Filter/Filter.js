import React from 'react';
import './filter.css';
import { useEffect, useState } from 'react';
import Tag from '../../TicketWindow/Tag/Tag';

const Filter = (props) => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            const tagsFromServer = await fetchTags()
            setTags(tagsFromServer)
        }
        getTags()
    }, [])

    const fetchTags = async () => {
        const res = await fetch('http://localhost:9090/boards/' + props.id + '/tags/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        return await res.json()
    }

    const sendFilters = async ()=>{
        var checkboxes = document.getElementsByClassName('tagsCheckBox');
        var tagsId = [];
        for (var index = 0; index < checkboxes.length; index++) {
           if (checkboxes[index].checked) {
            tagsId.push(checkboxes[index].value);
             
           }
        }
        const res = await fetch('http://localhost:9090/boards/'+props.id+'/filteredTickets?tagsId='+tagsId.map(i=>Number(i)).join(','), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
        });

        var data = await res.json();
        console.log(await data);
    }



    var tagsList = tags.map((tag)=><div><input className="tagsCheckBox" type="checkbox" name="tags[]" value={tag.id}/><label for={tag.id}>{tag.text}</label></div>);
    tagsList = [...tagsList, <div><input className="tagsCheckBox" type="checkbox" name="tags[]" value={0}/><label for={0}>No labels</label></div>];
    
    return <div className="filterWrapper">
        <input type="button" value="send" onClick={sendFilters}/>
        {tagsList}
    </div>;
}

export default Filter;