import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { verify } from "../../redux/slice/authSlice";

const Verify = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const [statusVerify, setStatusVerify] = useState("");

  useEffect(() => {
    dispatch(verify({ id: id, token: token }))
      .unwrap()
      .then(() => {
        setStatusVerify("Done");
      })
      .catch(() => {
        setStatusVerify("Error");
      })
  }, [id, token]);

  return (
    <Container>
      <div className="text-center py-5 fs-3 text-uppercase">
        {statusVerify === "Done" &&
          <div>
            Xác thực tài khoản thành công!
          </div>
        }
        {statusVerify === "Error" &&
          <div>
            Đường dẫn không hợp lệ!
          </div>
        }
      </div>
    </Container>
  );
};

export default Verify;