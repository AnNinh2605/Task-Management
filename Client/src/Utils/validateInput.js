const noSpaceValidate = (input) => {
    return (input + "").trim().length == 0 ? "This field cannot contain only spaces" : true;
}
const validate = { noSpaceValidate }

export default validate;