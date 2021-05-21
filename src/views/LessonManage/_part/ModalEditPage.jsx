import React, { useState, useEffect, useRef } from "react";
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
import {
  Edit,
  Delete,
  Add,
  CollectionsBookmarkOutlined,
} from "@material-ui/icons";
import { Grid, Chip, Avatar, Fab } from "@material-ui/core";
import {
  getAllLesson,
  getLesson,
  postLesson,
  uploadMediaFile,
  putLesson,
  deleteLesson,
  deletePage,
  getAllPage,
} from "../../../ultil/api";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { apiUrl } from "../../../ultil/apiUrl";
import { UploadOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ModalEditPage(props) {
  console.log(props);

  return (
    <Modal
      title="Page"
      visible={props.visiblePageEdit}
      footer={null}
      onOk={props.handleOkPageEdit}
      onCancel={props.handleCancelPageEdit}
      width="800"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={props.onFinishPage}
          form={props.formPage}
        >
          <Form.Item
            name="page_order"
            label="New page order:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image_background"
            label="New Image:"
            valuePropName="fileList"
            getValueFromEvent={props.normFilePage}
            extra="image background"
          >
            <Upload
              id="image_background"
              name="logo"
              action="/upload.do"
              listType="picture"
            >
              <Button type="primary">
                <UploadOutlined />
                Click to upload lesson image background
              </Button>
            </Upload>
          </Form.Item>
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
      </div>
    </Modal>
  );
}
