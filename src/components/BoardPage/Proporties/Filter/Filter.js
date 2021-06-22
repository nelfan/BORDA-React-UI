import React from 'react';
import './filter.css';
import { useEffect, useState } from 'react';
import Tag from '../../TicketWindow/Tag/Tag';

const Filter = (props) => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            const tagsFromServer = await fetchTags()
            console.log(tagsFromServer);
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
        var checkboxesChecked = [];
        for (var index = 0; index < checkboxes.length; index++) {
           if (checkboxes[index].checked) {
              checkboxesChecked.push(checkboxes[index].value);
             
           }
        }
        var body = {
            'tagsId': checkboxesChecked
        }
        const res = await fetch('http://localhost:9090/boards/'+props.id+'/filterTagsOption', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(body),
        });

        var data = await res;
    }



    var tagsList = tags.map((tag)=><div><input className="tagsCheckBox" type="checkbox" name="tags[]" value={tag.id}/><label for={tag.id}>{tag.text}</label></div>);
    tagsList = [...tagsList, <div><input className="tagsCheckBox" type="checkbox" name="tags[]" value={0}/><label for={0}>No labels</label></div>];
    
    return <div className="filterWrapper">
        <input type="button" value="send" onClick={sendFilters}/>
        {tagsList}
    </div>;
}

export default Filter;