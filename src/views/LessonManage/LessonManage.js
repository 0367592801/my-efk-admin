import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Grid, Chip, Avatar, Fab } from "@material-ui/core";
import {
  Edit,
  Delete,
  Add,
  CollectionsBookmarkOutlined,
} from "@material-ui/icons";
import lodash from "lodash";
import {
  getAllLesson,
  getLesson,
  postLesson,
  uploadMediaFile,
  putLesson,
  deleteLesson,
} from "../../ultil/api";
import Swal from "sweetalert2";
import { apiUrl } from "../../ultil/apiUrl";
import ReactPlayer from "react-player";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const useStyles = makeStyles(styles);

export default function LessonManage() {
  const classes = useStyles();
  const [dataLesson, setdataLesson] = useState(null);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [practiceVideo, setPracticeVideo] = useState(null);
  const [playVideo, setplayVideo] = useState(true);
  const [lesson, setlesson] = useState(null);
  const [form] = Form.useForm();

  const reactPlayer = useRef(null);

  async function fetchDataLesson() {
    let res = await getAllLesson();
    console.log(res);
    setdataLesson(res.data);
  }
  useEffect(() => {
    fetchDataLesson();
  }, []);
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log(extra.currentDataSource);
    // this.setState({
    //   selectedRowKeys: [],
    //   loading: false,
    //   current: Number(pagination.current),
    //   pageSize: Number(pagination.pageSize),
    // });
  };

  const showModalEdit = () => {
    setVisibleEdit(true);
  };

  const handleOkEdit = () => {
    setTimeout(() => {
      setVisibleEdit(false);
    }, 1000);
  };

  const handleCancelEdit = () => {
    console.log("Clicked cancel button");
    setlesson(null);
    form.resetFields();
    setVisibleEdit(false);
  };

  const showModalVideo = (practice_video) => {
    console.log(reactPlayer);
    console.log(practice_video);
    setPracticeVideo(practice_video);
    setVisibleVideo(true);
  };

  const handleOkVideo = () => {
    setTimeout(() => {
      setVisibleVideo(false);
    }, 1000);
  };

  const handleCancelVideo = async () => {
    console.log("Clicked cancel button");
    console.log(reactPlayer);
    await setplayVideo(false);
    setVisibleVideo(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = async (values) => {
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
      console.log("Received values of form: ", values);

      // let data = {
      //   season_name: values.season_name,
      // };
      // console.log(season);
      // let res = season
      //   ? await putSeason(season.id, data)
      //   : await postSeason(data);
      // console.log(res);
      // let season_id = res.data.id;

      // if (values.season_img)
      //   await uploadMediaFile(
      //     values.season_img[0],
      //     "season",
      //     season_id,
      //     "season_img"
      //   );

      setTimeout(() => {
        setVisibleEdit(false);
      }, 1000);

      fetchDataLesson();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload success",
        showConfirmButton: false,
        timer: 1500,
      });
      form.resetFields();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again!",
      });
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Lesson name",
      dataIndex: "lesson_name",
      key: "name",
      // ...this.getColumnSearchProps("name"),
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 400,
    },
    {
      title: "Number page",
      dataIndex: "number_page",
      key: "number_page",
      align: "center",
    },
    {
      title: "Vocabulary model type",
      dataIndex: "model_type",
      key: "model_type",
      align: "center",
    },
    {
      title: "Practice video",
      dataIndex: "practice_video",
      key: "practice_video",
      align: "center",
      render: (practice_video) => (
        <div>
          <span
            onClick={() => showModalVideo(practice_video)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Watch Video
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id, lesson",
      key: "action",
      render: (id, lesson) => (
        <div style={{ display: "flex" }}>
          {/* {console.log('1,', season)} */}
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={() => {
              console.log(lesson);
              setlesson(lesson);
              setVisibleEdit(true);
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
                    // await deleteLesson(lesson.id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    fetchDataLesson();
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

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Lesson Manage</h4>
      </CardHeader>
      <CardBody>
        <Button
          style={{ marginRight: "15px" }}
          type="primary"
          onClick={showModalEdit}
        >
          Create new Lesson
        </Button>
        <Button type="success" onClick={showModalEdit}>
          Import Excel file
        </Button>
        {dataLesson ? (
          <Table
            // ref={this.tableRef}
            dataSource={dataLesson}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "white",
              // paddingBottom: `${this.state.levelHeight}px`,
              // paddingTop: dataAllStories.length > 0 ? '0px' : '0px',
              // clear: 'both',
            }}
            columns={columns}
            onChange={onChange()}
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
        ) : (
          ""
        )}
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
        <Modal
          title="Practice Video"
          visible={visibleVideo}
          footer={null}
          onOk={handleOkVideo}
          onCancel={handleCancelVideo}
          width="800"
        >
          {practiceVideo ? (
            <ReactPlayer
              ref={reactPlayer}
              height="300px"
              width="auto"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
              url={`${apiUrl}${practiceVideo.url}`}
              playing={playVideo}
              controls={true}
            />
          ) : (
            "This lesson has no video."
          )}
        </Modal>
      </CardBody>
    </Card>
  );
}
