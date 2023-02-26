import React, { useState } from "react"

function Form({getNumber, getType}) {

    //Get all the values from the input fields
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");

    //Booleans on each fields if they are valid or not
    const [fnameValid, setfnameValid] = useState(true);
    const [lnameValid, setlnameValid] = useState(true);
    const [phoneValid, setphoneValid] = useState(true);
    const [addressValid, setaddressValid] = useState(true);
    const [typeValid, settypeValid] = useState(true);

    //Index number to be sent to Result
    const [pokedex, setPokedex] = useState(0);

    //Capitalize all letters, we only need the alphabet and turn it into a number 
    //WHERE = A is 1 and Z is 26 || 1 is 2 and 9 is 10
    const stringToNumber = (string, offset) => {
        let value = 0;
        for (let i = 0; i < string.length; i++){
            value +=(string.toUpperCase().charCodeAt(i) - offset);
        }
        return value;
    };

    const poketype = [
        "Normal","Fighting","Flying",
        "Poison","Ground","Rock",
        "Bug", "Ghost",
        "Steel", "Fire", "Water",
        "Grass", "Electric", "Psychich",
        "Ice", "Dragon", "Dark",
        "Fairy"];

    //Generate the list of pokemon in the HTML <select>
    const Listtype = poketype.map((type) => {
        return <option value={type.toLowerCase()}>{type}</option>;
    })

    //Modal visibility toggle of the modal
    const [verification, toggleVerification] = useState("hidden");
    const handleModal = () => {
        if (verification === "hidden" ) {
            toggleVerification("block");
        }
        else {
            toggleVerification("hidden");
        }
    };

    //Sending the data required to the sibling component
    const sendNumber = () => {
        getNumber(pokedex);
        getType(type);
        handleModal();
    }

    //Once clicked, the button process all the textfields input.
    const submitButton = () => {
        let sumAll = 0;
        let filled = true;

        //Handles the first name
        if (fname.length < 2) {
            setfnameValid(false);
            filled = false;
        }
        else {
            sumAll += stringToNumber(fname, 64);
            setfnameValid(true);
        }
        
        //Handles the last name
        if (lname.length < 2) {
            setlnameValid(false);
            filled = false;
        }
        else {
            sumAll += stringToNumber(lname, 64);
            setlnameValid(true);
        }

        //Handles the phone
        if (phone === "") {
            filled = false;
            setphoneValid(false)
        }
        else {
            sumAll += stringToNumber(phone, 47);
            setphoneValid(true);
        }

        //Handles the address
        if (address.length < 5) {
            filled = false;
            setaddressValid(false);
        }
        else {
            sumAll += stringToNumber(address, 47);
            setaddressValid(true);
        }

        //Handles the type
        if (type === "") {
            filled = false;
            settypeValid(false);
        }
        else {
            settypeValid(true);
        }

        if (filled){
            setPokedex(sumAll);
            handleModal();
        }
        
    };

  return (
    <div id="form" class="flex flex-col justify-center items-center 
    min-h-screen py-12">
        <h1 class="text-5xl font-bold text-center mb-10">Fill in the form</h1>
        <form class="w-full max-w-xs px-6">
            <label class="block mb-1">First name:</label>
            <input type="text" id="fname" name="fname"
            placeholder="First name"
            class={`px-3 mb-4 py-2 w-full border rounded-md 
            ${fnameValid ? "border-gray-400 ":"border-rose-500"}`}
            onChange={e=> setFname(e.target.value.replace(/[^a-z]/gi, ''))}
            value={fname}/>
            <label class={`mb-4 -mt-4 text-rose-500 
            ${fnameValid ? "hidden":"block"}`}>
                Must be at least 2 characters long.
            </label>

            <label class="block mb-1">Last name:</label>
            <input type="text" id="lname" name="lname"
            placeholder="Last name"
            class={`px-3 mb-4 py-2 w-full border rounded-md 
            ${lnameValid ? "border-gray-400 ":"border-rose-500"}`}
            onChange={e=>setLname(e.target.value.replace(/[^a-z]/gi, ''))}
            value={lname}/>
            <label class={`mb-4 -mt-4 text-rose-500 
            ${lnameValid ? "hidden":"block"}`}>
                Must be at least 2 characters long.
            </label>

            <label class="block mb-1">Phone number:</label>
            <input type="text" id="phone" name="phone"
            placeholder="123456789"
            class={`px-3 mb-4 py-2 w-full border rounded-md 
            ${phoneValid ? "border-gray-400 ":"border-rose-500"}`}
            onChange={e=>setPhone(e.target.value.replace(/[^0-9]/gi, ''))}
            value={phone}/>
            <label class={`mb-4 -mt-4 text-rose-500 
            ${phoneValid ? "hidden":"block"}`}>
                Must be at least 4 numbers long.
            </label>
            

            <label class="block mb-1">Address:</label>
            <input type="text" id="address" name="address"
            placeholder="1234 John Street"
            class={`px-3 mb-4 py-2 w-full border rounded-md 
            ${addressValid ? "border-gray-400 ":"border-rose-500"}`}
            onChange={e=>setAddress(e.target.value)}/>
            <label class={`mb-4 -mt-4 text-rose-500 
            ${addressValid ? "hidden":"block"}`}>
                Must be at least 5 characters long.
            </label>

            <label class="block mb-1">
                Select your favourite Pokemon type
            </label>
            <select class={`rounded-lg w-full px-3 py-2
            border border-2"
            ${typeValid ? "border-gray-400 ":"border-rose-500"}`}
            size="5"
            onChange={e=>setType(e.target.value)}>
                {Listtype}
            </select>
            <label class={`mb-4 text-rose-500 
            ${typeValid ? "hidden":"block"}`}>
                Must pick a type.
            </label>
        </form>

        

        <button class="mt-6 py-2 px-3 rounded-xl
        bg-sky-400
        text-white font-bold text-lg"
        onClick={submitButton}>
            Find your Pokemon!
        </button>

        <div class={`fixed overflow-y-auto inset-0 
        bg-gray-600 bg-opacity-50 backdrop-blur-sm 
        h-full w-full
        ${verification}`}>
            <div class="flex h-screen">
                <div class="flex flex-col p-6 w-full m-auto max-w-md 
                shadow-lg rounded-xl bg-white ">
                    <h1 class="text-2xl font-bold text-center mb-3">
                        Are you sure?
                    </h1>
                    <div class="flex flex-col text-center gap-y-4">
                        <div class="">
                            <p class="font-bold">First name:</p>
                            <p>{fname}</p>
                        </div>

                        <div class="">
                            <p class="font-bold">Last name:</p>
                            <p>{lname}</p>
                        </div>

                        <div class="">
                            <p class="font-bold">Phone:</p>
                            <p>{phone}</p>
                        </div>

                        <div class="">
                            <p class="font-bold">Address:</p>
                            <p>{address}</p>
                        </div>

                        <div class="">
                            <p class="font-bold">Type:</p>
                            <p>{type}</p>
                        </div>
                    </div>
                    <a class="mt-6 py-2 px-3 rounded-xl
                    bg-sky-400
                    text-white font-bold text-center text-lg"
                    href="#result"
                    onClick={sendNumber}>
                        Confirm
                    </a>
                    <button class="mt-4 py-2 px-3 rounded-xl
                    border border-2 border-sky-400
                    text-sky-400 font-bold text-lg"
                    onClick={handleModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Form;