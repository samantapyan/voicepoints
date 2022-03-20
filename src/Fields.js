
const Data = {
    fieldsUserSignUp: [
        { key: 'firstName', name: 'First Name', value: '', required: true, helperText: 'field is required', type:"text" },
        { key: 'lastName', name: 'Last Name', value: '', required: true, helperText: 'field is required', type:"text" },
        { key: 'email', name: 'Email Address', value: '', required: true, helperText: 'field is required', type:"text" },
        { key: 'country', name: 'Country', value: '', required: false, helperText: '' },
        { key: 'password', name: 'Password', value: '', required: true, helperText: 'password is required', type:"password" },
        { key: 'passwordAgain', name: 'Password again', value: '', required: true, helperText: 'second password typing is required', type:"password" },


    ],
    fieldsUserLogin: [
        { key: 'email', name: 'Email Address', value: '', required: true, helperText: 'field is required', type:"text" },
        { key: 'password', name: 'Password', value: '', required: true, helperText: 'password is required', type:"password" },
    ],
    fieldsJury: [
        { key: 'firstName', name: 'First Name', value: '', required: true, helperText: 'field is required', type:"text" },
        { key: 'lastName', name: 'Last Name', value: '', required: true, helperText: 'field is required', type:"text" }
    ]
};

export default Data;
