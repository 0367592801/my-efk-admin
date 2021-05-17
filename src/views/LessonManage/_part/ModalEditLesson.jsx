import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  Divider,
  Tag,
  Input,
  Icon,
  Modal,
  Select,
  Upload,
  Form,
  Button,
} from "antd";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { apiUrl } from "../../ultil/apiUrl";

class ModalEditLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal
        title="Lesson"
        visible={visibleEdit}
        footer={null}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width="800"
      >
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
        >
          {lesson != null && (
            <Form.Item label="Old name: ">
              {/* <span>{season.season_name}</span> */}
            </Form.Item>
          )}
          {/* {lesson != null && (
                <Form.Item label="Old thumbnail: ">
                  {lesson.season_img ? (
                    <img
                      style={{ margin: "0 auto" }}
                      src={`${apiUrl}${season.season_img?.url}`}
                      width="100px"
                    />
                  ) : (
                    "This season has no thumbnail!"
                  )}
                </Form.Item>
              )} */}
          <Form.Item
            name="lesson_name"
            label={`${lesson != null ? "New name:" : "Lesson name"}`}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
                name="season_img"
                label={`${
                  season != null ? "New thumbnail:" : "Season thumbnail"
                }`}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="season thumbnail"
              >
                <Upload
                  id="thumbnail"
                  name="logo"
                  action="/upload.do"
                  listType="picture"
                >
                  <Button type="primary">
                    <UploadOutlined />
                    Click to upload season thumbnail
                  </Button>
                </Upload>
              </Form.Item> */}
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="info" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(ModalEditLesson);
