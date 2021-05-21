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
  postPage,
  putPage,
} from "../../../ultil/api";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { apiUrl } from "../../../ultil/apiUrl";
import { UploadOutlined } from "@ant-design/icons";
import ModalEditPage from "./ModalEditPage";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ModalEditLesson(props) {
  const [lesson, setlesson] = useState(null);
  // page
  const [page, setPage] = useState(null);
  const [visiblePageEdit, setVisiblePageEdit] = useState(false);
  const [dataPage, setdataPage] = useState(null);
  const [formPage] = Form.useForm();

  async function fetchDataPage(lesson_id) {
    let res = await getLesson(lesson_id);
    setlesson(res.data);
  }

  const columnsPages = [
    {
      title: "Page order",
      dataIndex: "page_order",
      key: "page_order",
      // ...this.getColumnSearchProps("name"),
      width: 200,
    },
    {
      title: "Thumbnail",
      dataIndex: "image_background",
      key: "thumbnail",
      align: "center",
      render: (img) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            // onMouse
            onClick={() => {
              Swal.fire({
                imageUrl: `${apiUrl}${img?.url}`,
                html: img && img?.url ? "" : "This season has no thumbnail!",
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                  image: "storiesSwal",
                },
                width: 350,
                padding: 0,
              });
            }}
            src={`${apiUrl}${img?.url}`}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id, page",
      key: "action",
      render: (id, page) => (
        <div style={{ display: "flex" }}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={() => {
              setPage(page);
              setVisiblePageEdit(true);
            }}
            style={{ marginRight: "15px" }}
          >
            <Edit />
          </Fab>
          <Fab
            color="secondary"
            aria-label="delete"
            size="small"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await deletePage(page.id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    fetchDataPage(props.lesson.id);
                  } catch (e) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong, please try again!",
                    });
                  }
                }
              });
            }}
          >
            <Delete />
          </Fab>
        </div>
      ),
    },
  ];

  const onChangeTablePage = (pagination, filters, sorter, extra) => {
    // console.log(extra.currentDataSource);
    // this.setState({
    //   selectedRowKeys: [],
    //   loading: false,
    //   current: Number(pagination.current),
    //   pageSize: Number(pagination.pageSize),
    // });
  };

  const showModalPageEdit = () => {
    setVisiblePageEdit(true);
  };

  const handleOkPageEdit = () => {
    setTimeout(() => {
      setVisiblePageEdit(false);
    }, 1000);
  };

  const handleCancelPageEdit = () => {
    console.log("Clicked cancel button");
    setPage(null);
    formPage.resetFields();
    setVisiblePageEdit(false);
  };

  const normFilePage = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinishPage = async (values) => {
    try {
      await Swal.fire({
        title: "Data uploading",
        html: "Please wait!",
        timer: 1200,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let data = page
        ? {
            page_order: values.page_order,
          }
        : {
            page_order: values.page_order,
            lesson: props.lesson.id,
          };

      let res = page ? await putPage(page.id, data) : await postPage(data);

      let page_id = res.data.id;

      if (values.image_background)
        await uploadMediaFile(
          values.image_background[0],
          "page",
          page_id,
          "image_background"
        );

      setTimeout(() => {
        setVisiblePageEdit(false);
      }, 1000);

      fetchDataPage(props.lesson.id);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload success",
        showConfirmButton: false,
        timer: 1500,
      });
      formPage.resetFields();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again!",
      });
      formPage.resetFields();
    }
  };

  return (
    <Modal
      title="Lesson"
      visible={props.visibleEdit}
      footer={null}
      onOk={props.handleOkEdit}
      onCancel={props.handleCancelEdit}
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
          onFinish={props.onFinish}
          form={props.form}
        >
          <Form.Item
            name="lesson_name"
            label="New name:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="New desciption:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model_type"
            label="New model type name:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lesson_video"
            label={`${props.lesson != null ? "New Video:" : "Lesson video"}`}
            valuePropName="fileList"
            getValueFromEvent={props.normFile}
            extra="lesson video"
          >
            <Upload id="video" name="logo" action="/upload.do" listType="video">
              <Button type="primary">
                <UploadOutlined />
                Click to upload lesson video
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
        <Button
          style={{ width: "200px" }}
          type="primary"
          onClick={showModalPageEdit}
        >
          Create new page
        </Button>
        <React.Fragment>
          <Table
            // ref={this.tableRef}
            dataSource={lesson ? lesson?.pages : props.lesson?.pages}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "white",
              // paddingBottom: `${this.state.levelHeight}px`,
              // paddingTop: dataAllStories.length > 0 ? '0px' : '0px',
              // clear: 'both',
            }}
            columns={columnsPages}
            onChange={onChangeTablePage()}
            pagination={{
              // pageSize: 5,
              pageSizeOptions: ["5", "10", "20"],
              showSizeChanger: true,
              locale: { items_per_page: "" },
              defaultPageSize: 5,
              // onShowSizeChange={this.onShowSizeChange}
            }}
            // locale={{ filterReset: '' }}
            // rowSelection={rowSelection}
            rowKey="id"
          />
          <ModalEditPage
            visiblePageEdit={visiblePageEdit}
            handleOkPageEdit={handleOkPageEdit}
            handleCancelPageEdit={handleCancelPageEdit}
            onFinishPage={onFinishPage}
            formPage={formPage}
            page={page}
            normFilePage={normFilePage}
          />
        </React.Fragment>
      </div>
    </Modal>
  );
}
