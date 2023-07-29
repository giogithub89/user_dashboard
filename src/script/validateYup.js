import * as Yup from "yup";

export const validationSchema = Yup.object({
  password: Yup.string()
    //.min(8, "La password deve contenere minimo 8 caratteri")
    //.matches(/^[a-zA-Z0-9]+$/, "La password deve essere alfanumerica"),
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "La password deve contenere almeno 8 caratteri, di cui almeno una lettera minuscola, una lettera maiuscola, e un numero"
    ),
  confirmPswd: Yup.string().oneOf([Yup.ref("password"), null], "Le password non corrispondono"),
});

export const validation = Yup.object({
  password: Yup.string()
    //.min(8, "La password deve contenere minimo 8 caratteri")
    //.matches(/^[a-zA-Z0-9]+$/, "La password deve essere alfanumerica"),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/),

    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "La password deve contenere almeno 8 caratteri, di cui almeno una lettera e un numero"
    ),
});
