import React from 'react';
import './filter.css';
import { useEffect, useState } from 'react';

const Filter = (props) => {

    const [tags, setTags] = useState([]);
    const [members, setMembers] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            const tagsFromServer = await fetchTags()
            setTags(tagsFromServer)
        }
        getTags()
        const getMembers = async () => {
            const membersFromServer = await fetchMembers()
            setMembers(membersFromServer)
        }
        getMembers()
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


    const fetchMembers = async () => {
        const res = await fetch('http://localhost:9090/boards/' + props.id + '/users/roles/' + 1, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })
        const owners = await res.json()

        const res2 = await fetch('http://localhost:9090/boards/' + props.id + '/users/roles/' + 2, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            }
        })

        const collaborators = await res2.json()

        return [...owners, ...collaborators]
    }


    const sendFilters = async () => {
        var checkboxes = document.getElementsByClassName('tagsCheckBox');
        var tagsId = [];
        for (var index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                tagsId.push(checkboxes[index].value);

            }
        }
        var membersCheckboxes = document.getElementsByClassName('membersCheckBox');
        var membersId = [];
        for (var index = 0; index < membersCheckboxes.length; index++) {
            if (membersCheckboxes[index].checked) {
                membersId.push(membersCheckboxes[index].value);
            }
        }

        const res = await fetch('http://localhost:9090/boards/' + props.id + '/filteredTickets?tagsId='
            + tagsId.map(i => Number(i)).join(',') +
            '&' +
            'membersId=' + membersId.map(i => Number(i)).join(','), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
            },
        });


        if (res.status == 200) {
            const data = await res.json();
            sessionStorage.setItem('isFiltered', true);
            sessionStorage.setItem('filteredTickets', JSON.stringify(await data));
        }
    }

    const dropFilters = () => {
        sessionStorage.setItem('isFiltered', false);
            sessionStorage.setItem('filteredTickets', JSON.stringify([]));
    }

    var tagsList = tags.map((tag) => <div key={tag.id}><input className="tagsCheckBox" type="checkbox" name="tags[]" value={tag.id} /><label for={tag.id}>{tag.text}</label></div>);
    tagsList = [...tagsList, <div key={0}><input className="tagsCheckBox" type="checkbox" name="tags[]" value={0} /><label htmlFor={0}>No labels</label></div>];


    var membersList = members.map((member) => <div key={member.id}><input className="membersCheckBox" type="checkbox" name="members[]" value={member.id} /><label for={member.id}>{member.username}</label></div>)
    membersList = [...membersList, <div key={0}><input className="membersCheckBox" type="checkbox" name="members[]" value={0} /><label htmlFor={0}>No members</label></div>];
    return <div className="filterWrapper">
        <input type="button" value="filter" onClick={sendFilters} />
        <input type="button" value="drop filters" onClick={dropFilters} />
        {tagsList}
        {membersList}
    </div>;
}

export default Filter;