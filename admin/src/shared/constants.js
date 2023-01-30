import * as yup from "yup";

export const CREATE_ADMIN_SUCCESS = "Tạo tài khoản thành công!";
export const UPDATE_ADMIN_SUCCESS = "Cập nhật tài khoản thành công!";
export const DELETE_ADMIN_SUCCESS = "Xoá tài khoản thành công!";

export const CREATE_CATEGORY_SUCCESS = "Tạo danh mục thành công!";
export const UPDATE_CATEGORY_SUCCESS = "Cập nhật danh mục thành công!";
export const DELETE_CATEGORY_SUCCESS = "Xoá danh mục thành công!";

export const CREATE_CUSTOMER_SUCCESS = "Tạo tài khoản thành công!";
export const UPDATE_CUSTOMER_SUCCESS = "Cập nhật tài khoản thành công!";
export const DELETE_CUSTOMER_SUCCESS = "Xoá tài khoản thành công!";

export const CREATE_ADDRESS_SUCCESS = "Tạo địa chỉ thành công!";
export const UPDATE_ADDRESS_SUCCESS = "Cập nhật địa chỉ thành công!";
export const DELETE_ADDRESS_SUCCESS = "Xoá địa chỉ thành công!";

export const CREATE_PRODUCT_SUCCESS = "Tạo sản phẩm thành công!";
export const UPDATE_PRODUCT_SUCCESS = "Cập nhật sản phẩm thành công!";
export const DELETE_PRODUCT_SUCCESS = "Xoá sản phẩm thành công!";

export const CREATE_ORIGIN_SUCCESS = "Tạo xuất xứ thành công!";
export const UPDATE_ORIGIN_SUCCESS = "Cập nhật xuất xứ thành công!";
export const DELETE_ORIGIN_SUCCESS = "Xoá xuất xứ thành công!";


export const CREATE_SUPPLIER_SUCCESS = "Tạo nhà cung cấp thành công!";
export const UPDATE_SUPPLIER_SUCCESS = "Cập nhật nhà cung cấp thành công!";
export const DELETE_SUPPLIER_SUCCESS = "Xoá nhà cung cấp thành công!";

export const UPDATE_PROFILE_SUCCESS = "Cập nhật tài khoản thành công!";

export const VALIDATE_FORM_LOGIN = yup.object({
  email: yup.string()
    .email('Email không hợp lệ!')
    .required("Vui lòng nhập Email!"),
  password: yup.string()
    .required("Vui lòng nhập mật khẩu!")
});

export const VALIDATE_FORM_ADMIN = yup.object({
  lastName: yup.string()
    .required('Vui lòng điền vào mục này'),
  firstName: yup.string()
    .required('Vui lòng điền vào mục này'),
  email: yup.string()
    .email('Email không hợp lệ!')
    .required('Vui lòng điền vào mục này'),
  password: yup.string()
    .required('Vui lòng điền vào mục này')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, 'Mật khẩu không hợp lệ'),
  role: yup.string()
    .required('Vui lòng chọn mục này')
});

export const VALIDATE_FORM_UPDATE_ADMIN = yup.object({
  lastName: yup.string()
    .required('Vui lòng điền vào mục này'),
  firstName: yup.string()
    .required('Vui lòng điền vào mục này'),
  email: yup.string()
    .email('Email không hợp lệ!')
    .required('Vui lòng điền vào mục này'),
  password: yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, 'Mật khẩu không hợp lệ'),
  role: yup.string()
    .required('Vui lòng chọn mục này')
});

export const VALIDATE_FORM_CATEGORY = yup.object({
  name: yup.string()
    .required('Vui lòng điền vào mục này'),
  parentId: yup.string()
    .required('Vui lòng chọn mục này'),
  desc: yup.string()
    .required('Vui lòng điền vào mục này'),
  slug: yup.string()
    .required('Vui lòng điền vào mục này')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, 'Đường dẫn không hợp lệ'),
  imgFirebase: yup.string(),
  imgLocal: yup.string()
    .when('imgFirebase', (imgFirebase, schema) => {
      return !imgFirebase ? schema.required("Vui lòng upload ảnh") : schema;
    })
});

export const VALIDATE_FORM_CUSTOMER = yup.object({
  name: yup.string()
    .required('Vui lòng điền vào mục này'),
  email: yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng điền vào mục này'),
  password: yup.string()
    .required('Vui lòng điền vào mục này')
    .min(8, 'Mật khẩu quá ngắn'),
  gender: yup.string()
    .required('Vui lòng chọn mục này'),
  phone: yup.string()
    .required('Vui lòng điền vào mục này')
    .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ'),
  dateOfBirth: yup.date()
    .required('Vui lòng điền vào mục này')
    .typeError('Ngày sinh không hợp lệ')
    .nullable()
});

export const VALIDATE_FORM_ADDRESS = yup.object({
  email: yup.string()
    .required('Vui lòng điền vào mục này'),
  name: yup.string()
    .required('Vui lòng điền vào mục này'),
  city: yup.string()
    .required('Vui lòng điền vào mục này'),
  district: yup.string()
    .required('Vui lòng điền vào mục này'),
  wards: yup.string()
    .required('Vui lòng điền vào mục này'),
  street: yup.string()
    .required('Vui lòng điền vào mục này'),
  phone: yup.string()
    .required('Vui lòng điền vào mục này')
    .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ')
});

export const VALIDATE_FORM_PRODUCT = yup.object({
  name: yup.string()
    .required('Vui lòng điền vào mục này'),
  imgsFirebase: yup.array(),
  files: yup.array()
    .when('imgsFirebase', (imgsFirebase, schema) => {
      return imgsFirebase.length === 0 ? schema.min(1, "Vui lòng upload ảnh") : schema;
    }),
  desc: yup.string()
    .required('Vui lòng điền vào mục này'),
  sku: yup.string()
    .required('Vui lòng điền vào mục này'),
  costPrice: yup.number()
    .required('Vui lòng điền vào mục này'),
  price: yup.number()
    .required('Vui lòng điền vào mục này'),
  categories: yup.array()
    .min(2, 'Vui lòng chọn mục này'),
  origin: yup.string()
    .required('Vui lòng điền vào mục này'),
  supplier: yup.string()
    .required('Vui lòng điền vào mục này'),
  packing: yup.string()
    .required('Vui lòng điền vào mục này')
});

export const VALIDATE_FORM_SUPPLIER = yup.object({
  name: yup.string()
    .required('Vui lòng điền vào mục này'),
  sku: yup.string()
    .required('Vui lòng điền vào mục này'),
  email: yup.string()
    .required('Vui lòng điền vào mục này')
    .email('Email không hợp lệ'),
  phone: yup.string()
    .required('Vui lòng điền vào mục này')
    .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ'),
  city: yup.string()
    .required('Vui lòng chọn mục này'),
  district: yup.string()
    .required('Vui lòng chọn mục này'),
  wards: yup.string()
    .required('Vui lòng chọn mục này'),
  street: yup.string()
    .required('Vui lòng điền vào mục này')
});

export const VALIDATE_FORM_PROFILE = yup.object({
  firstName: yup.string()
    .required('Vui lòng điền vào mục này'),
  lastName: yup.string()
    .required('Vui lòng điền vào mục này'),
  email: yup.string()
    .required('Vui lòng điền vào mục này')
    .email('Email không hợp lệ'),
  isChangePW: yup.boolean(),
  password: yup.string()
    .when("isChangePW", {
      is: true,
      then: yup.string()
        .required("Vui lòng điền vào mục này")
    }),
  newPW: yup.string()
    .when("isChangePW", {
      is: true,
      then: yup.string()
        .required("Vui lòng điền vào mục này")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, "Mật khẩu không hợp lệ")
    }),
  confirmPW: yup.string()
    .when("isChangePW", {
      is: true,
      then: yup.string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp!")
        .required("Vui lòng điền vào muc này")
    })
});