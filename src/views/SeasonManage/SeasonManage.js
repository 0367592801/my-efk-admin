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
  getAllSeason,
  getSeason,
  postSeason,
  uploadMediaFile,
  putSeason,
  deleteSeason,
} from "../../ultil/api";
import Swal from "sweetalert2";
import { apiUrl } from "../../ultil/apiUrl";

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

export default function SeasonManage() {
  const classes = useStyles();
  const [dataSeason, setdataSeason] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [season, setseason] = useState(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Season name",
      dataIndex: "season_name",
      key: "name",
      // ...this.getColumnSearchProps("name"),
      width: 200,
    },
    {
      title: "Thumbnail",
      dataIndex: "season_img",
      key: "thumbnail",
      align: "center",
      render: (img) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            // onMouse
            onClick={() => {
              console.log(img);
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
      dataIndex: "id, season",
      key: "action",
      render: (id, season) => (
        <div style={{ display: "flex" }}>
          {/* {console.log('1,', season)} */}
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={() => {
              console.log(season);
              setseason(season);
              setVisible(true);
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
                    await deleteSeason(season.id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    fetchDataSeason();
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
  async function fetchDataSeason() {
    let res = await getAllSeason();
    setdataSeason(res.data);
  }
  useEffect(() => {
    fetchDataSeason();
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
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setseason(null);
    form.resetFields();
    setVisible(false);
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

      let data = {
        season_name: values.season_name,
      };
      console.log(season);
      let res = season
        ? await putSeason(season.id, data)
        : await postSeason(data);
      console.log(res);
      let season_id = res.data.id;

      if (values.season_img)
        await uploadMediaFile(
          values.season_img[0],
          "season",
          season_id,
          "season_img"
        );

      setTimeout(() => {
        setVisible(false);
      }, 1000);

      fetchDataSeason();

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

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Season Manage</h4>
      </CardHeader>
      <CardBody>
        <Button type="primary" onClick={showModal}>
          Create new season
        </Button>
        {dataSeason ? (
          <Table
            // ref={this.tableRef}
            dataSource={dataSeason}
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
            rowKey="_id"
          />
        ) : (
          ""
        )}
        <Modal
          title="Season"
          visible={visible}
          footer={null}
          onOk={handleOk}
          onCancel={handleCancel}
          width="800"
        >
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            form={form}
          >
            {season != null && (
              <Form.Item label="Old name: ">
                <span>{season.season_name}</span>
              </Form.Item>
            )}
            {season != null && (
              <Form.Item label="Old thumbnail: ">
                {season.season_img ? (
                  <img
                    style={{ margin: "0 auto" }}
                    src={`${apiUrl}${season.season_img?.url}`}
                    width="100px"
                  />
                ) : (
                  "This season has no thumbnail!"
                )}
              </Form.Item>
            )}
            <Form.Item
              name="season_name"
              label={`${season != null ? "New name:" : "Season name"}`}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
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
        </Modal>
      </CardBody>
    </Card>
  );
}
