import React, { useState } from "react";
import EmployeeModal from "./EmployeeModal/EmployeeModal";
import EmployeeList from "./EmployeeList/EmployeeList";

const MainPage = ({ employees }) => {

    const [modal, setModal] = useState({
        isDisplayed: false,
        employeeInfo: ""
    });
    const [filtered, setFiltered] = useState({
        employeeList: employees
    });
    const [sortToggle, setSortToggle] = useState(false);

    // useEffect(() => {
    //     console.log("filtered state: ", filtered);
    // }, [filtered]);

    //modal
    const handleShowModal = (data, e) => {
        e.preventDefault();
        setModal({ isDisplayed: true, employeeInfo: data });

    };
    const handleCloseModal = (e) => {
        e.preventDefault();
        setModal({ isDisplayed: false });
    };

    // search and sort
    const sortFrom = (a, b, char, from, to) => {
        let charA = a[char].toUpperCase();
        let charB = b[char].toUpperCase();
        if (charA < charB) return from;
        if (charA > charB) return to;
        return 0;
    };

    const sortBy = (char, e) => {
        e.preventDefault();

        if (sortToggle === false) {
            setSortToggle(true);
            employees.sort(function (a, b) {
                return sortFrom(a, b, char, -1, 1);
            });
        } else {
            setSortToggle(false);
            employees.sort(function (a, b) {
                return sortFrom(a, b, char, 1, -1);
            });
        }
        setFiltered({ employeeList: employees });
    };

    const sortByDOB = (e) => {
        e.preventDefault();

        // sort by value
        if (sortToggle === false) {
            setSortToggle(true);
            employees.sort(function (a, b) {
                let arrA = a.dateOfBirth.split("/");
                let arrB = b.dateOfBirth.split("/");
                let dateA = new Date(arrA[2], arrA[1], arrA[0]);
                let dateB = new Date(arrB[2], arrB[1], arrB[0]);

                return dateA - dateB;
            });
        } else {
            setSortToggle(false);
            employees.sort(function (a, b) {
                let arrA = a.dateOfBirth.split("/");
                let arrB = b.dateOfBirth.split("/");
                let dateA = new Date(arrA[2], arrA[1], arrA[0]);
                let dateB = new Date(arrB[2], arrB[1], arrB[0]);

                return dateB - dateA;
            });
        }
        setFiltered({ employeeList: employees });
    };

    return <div>

        <form className="searchandfilter">

            <label>Search by name, id, role or email</label>
            <input type="search" name="search-term" id="search-term" placeholder="search term" />
            <button>search</button>
            <br />

            <label htmlFor="sort-by">Sort By</label>
            <div id="sort-by">
                <button onClick={ e => sortBy("name", e) }>Name</button>
                <button onClick={ e => sortBy("role", e) }>Role</button>
                <button onClick={ sortByDOB }>D.O.B</button>
                <button onClick={ e => sortBy("gender", e) }>Gender</button>
            </div>

        </form>

        <EmployeeModal
            isDisplayed={ modal.isDisplayed }
            employeeInfo={ modal.employeeInfo }
            handleCloseModal={ handleCloseModal } />

        <EmployeeList
            handleShowModal={ handleShowModal }
            results={ filtered } />
    </div>;

};

export default MainPage;