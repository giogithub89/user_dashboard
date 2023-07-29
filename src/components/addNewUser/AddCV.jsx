import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, TextField, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, { useRef, useState } from "react";
import { tokens } from "../../theme";
import BoxCard from "../gridLayout/BoxCard";
import AlertDialog from "../modalDialog/AlertDialogDelete";

const AddCV = ({ experiences }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [widgetList, setWidgetList] = useState(experiences ? experiences : []);
  const [experience, setExp] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [id, setId] = useState();
  const titleRef = useRef();
  const yearFromRef = useRef();
  const yearToRef = useRef();
  // const [title, setTitle] = useState();
  // const [yearFrom, setYearFrom] = useState();
  // const [yearTo, setYearTo] = useState();
  // const [description, setDesc] = useState();
  console.log(widgetList);

  const addNewExperience = () => {
    const wid = {};
    setWidgetList([...widgetList, wid]);
    //const list = addWidget(widgetList, setWidgetList);
  };

  const openModal = (id) => {
    setOpenAlert(true);
    console.log(id);
    // const expid = widgetList.map((item) => console.log(item[id].id));
    // console.log(expid);
    setId(id);
  };

  const deleteExperience = (index) => {
    //const list = [...widgetList];
    const newList = widgetList.filter((row, i) => i !== index);

    // if (widgetList.length > 1) {
    setWidgetList(newList);
    setExp(newList);

    //   setOpenAlert(false);
    // }

    // list.splice(index, 1);
    // setWidgetList(list);
    console.log("index", index);
    //console.log("list", list);
    //removeWidget(widgetList, index, setWidgetList);
  };

  const submitForm = () => {
    console.log(titleRef.current);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="start" p="0px 5px 20px">
        <Tooltip title="Aggiungi esperienza">
          <IconButton sx={{ border: "1px solid", borderColor: colors.secondary[600] }} onClick={addNewExperience}>
            <Add sx={{ color: colors.secondary[400] }}></Add>
          </IconButton>
        </Tooltip>
      </Box>
      {/* <form onSubmit={submitForm}> */}
      {widgetList.map((el, index) => (
        <BoxCard
          backgroundColor={colors.primary[400]}
          rowGap="20px"
          m="0px 0px 20px 0px"
          boxShadow={"rgba(0, 0, 0, 0.64) 0px 3px 8px"}>
          <Box key={index} gridColumn="span 4" width="80%">
            <label htmlFor="title">Titolo</label>
            <TextField
              //   error={nameErrMsg}
              //   helperText={nameErrMsg}
              inputRef={titleRef}
              //onChange={(e) => setTitle(e.target.value)}
              size="small"
              margin="dense"
              type="text"
              id="title"
              fullWidth
              required
              defaultValue={el.title}></TextField>
          </Box>
          <Box gridColumn="span 2" width="80%">
            <label htmlFor="da">Dal</label>
            <TextField
              //   error={nameErrMsg}
              //   helperText={nameErrMsg}
              // inputRef={userRef}
              // onChange={(e) => setUser(e.target.value)}
              size="small"
              margin="dense"
              type="text"
              id="da"
              fullWidth
              required
              defaultValue={el.year_from}></TextField>
          </Box>
          <Box gridColumn="span 2" width="80%">
            <label htmlFor="to">Al</label>
            <TextField
              //   error={nameErrMsg}
              //   helperText={nameErrMsg}
              // inputRef={userRef}
              // onChange={(e) => setUser(e.target.value)}
              size="small"
              margin="dense"
              type="text"
              id="to"
              fullWidth
              required
              defaultValue={el.year_to}></TextField>
          </Box>
          <Box gridColumn="span 3" justifyContent="end"></Box>
          <Box gridColumn="span 1">
            <Tooltip title="Elimina esperienza">
              <IconButton onClick={() => openModal(index)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>

          <Box gridColumn="span 12" width="90%">
            <label htmlFor="description">Descrizione</label>
            <TextField
              //   error={nameErrMsg}
              //   helperText={nameErrMsg}
              // inputRef={userRef}
              // onChange={(e) => setUser(e.target.value)}
              margin="dense"
              type="text"
              id="description"
              fullWidth
              autoComplete="on"
              required
              multiline="3"
              defaultValue={el.description}></TextField>
          </Box>
        </BoxCard>
      ))}
      {/* </form> */}
      <AlertDialog
        title="Elimina esperienza?"
        desc="Vuoi eliminare questa esperienza"
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        //onClick={() => deleteExperience(id)}
        confirmModal={deleteExperience}
        id={id}></AlertDialog>
    </Box>
  );
};

export default AddCV;

// const [type, setType] = useState(null);
//   const [id, setId] = useState(null);
//   const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
//   const [deleteMessage, setDeleteMessage] = useState(null);
//   const [fruitMessage, setFruitMessage] = useState(null);
//   const [vegetableMessage, setVegetableMessage] = useState(null);

//   // Handle the displaying of the modal based on type and id
//   const showDeleteModal = (type, id) => {
//     setType(type);
//     setId(id);
//     setFruitMessage(null);
//     setVegetableMessage(null);

//     if (type === "fruit") {
//       setDeleteMessage(`Are you sure you want to delete the fruit '${fruits.find((x) => x.id === id).name}'?`);
//     } else if (type === "vegetable") {
//       setDeleteMessage(`Are you sure you want to delete the vegetable '${vegetables.find((x) => x.id === id).name}'?`);
//     }

//     setDisplayConfirmationModal(true);
//   };

//   // Hide the modal
//   const hideConfirmationModal = () => {
//     setDisplayConfirmationModal(false);
//   };

//   // Handle the actual deletion of the item
//   const submitDelete = (type, id) => {
//     if (type === "fruit") {
//       setFruitMessage(`The fruit '${fruits.find((x) => x.id === id).name}' was deleted successfully.`);
//       setFruits(fruits.filter((fruit) => fruit.id !== id));
//     } else if (type === "vegetable") {
//       setVegetableMessage(`The vegetable '${vegetables.find((x) => x.id === id).name}' was deleted successfully.`);
//       setVegetables(vegetables.filter((vegetable) => vegetable.id !== id));
//     }
//     setDisplayConfirmationModal(false);
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col md={{ span: 10, offset: 1 }}>
//           <h1>Reusable Delete Confirmation Modal</h1>
//           <Card className="mt-2">
//             <Card.Header>Fruits</Card.Header>
//             <Card.Body>
//               {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
//               <Table striped bordered hover size="sm">
//                 <thead>
//                   <tr>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th style={{ width: "120px" }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {fruits.map((fruit) => {
//                     return (
//                       <tr key={fruit.id}>
//                         <td>{fruit.id}</td>
//                         <td>{fruit.name}</td>
//                         <td className='text-center'>
//                           <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal("fruit", fruit.id)} />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//           <Card className="mt-2">
//             <Card.Header>Vegetables</Card.Header>
//             <Card.Body>
//               {vegetableMessage && <Alert variant="success">{vegetableMessage}</Alert>}
//               <Table striped bordered hover size="sm">
//                 <thead>
//                   <tr>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th style={{ width: "120px" }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {vegetables.map((vegetable) => {
//                     return (
//                       <tr key={vegetable.id}>
//                         <td>{vegetable.id}</td>
//                         <td>{vegetable.name}</td>
//                         <td className='text-center'>
//                           <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal("vegetable", vegetable.id)} />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={id} message={deleteMessage}  />
//     </Container>
//   );
// };

// export default App;
