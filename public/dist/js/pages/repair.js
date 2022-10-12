class RepairForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      action: props.repairData.action === 'edit' ? '維修資料編輯' : '維修資料新增',
      fab: props.repairData.fab ? props.repairData.fab : '',
      nbNumber: props.repairData.nbNumber ? props.repairData.nbNumber : '',
      formNo: props.repairData.formNo ? props.repairData.formNo : '',
      repairStatus: "ready",
      checkedOverdate: [false, true],
      remark: props.repairData.remark ? props.repairData.remark : '',
    }
  }

  overDateValues = ["是", "否"]

  statusOptions = [
    {
      value: "廠商維修中",
      label: "廠商維修中",
    },
    {
      value: "已報廢除帳",
      label: "已報廢除帳",
    },
    {
      value: "待送給原廠維修",
      label: "待送給原廠維修",
    },
    {
      value: "廠商已修復並歸還",
      label: "廠商已修復並歸還",
    },
  ]

  handleSubmit = async (e) => {
    let overDate = ""

    this.overDateValues.forEach((item, index) => {
      if(this.state.checkedOverdate[index] === true) {
        overDate = item
      }
    })

    let registerDate = $("#registerDate").datepicker("getDate");
    let formatDate = $.datepicker.formatDate("yy/mm/dd", registerDate)
    console.log(formatDate)
    
    try {
      let res = await fetch("http://localhost/repairRecord", {
        method: "POST",
        body: JSON.stringify({
          fab: this.state.fab,
          nbNumber: this.state.nbNumber,
          formNo: this.state.formNo,
          repairStatus: this.state.repairStatus,
          overDate: overDate,
          registerDate: formatDate,
          remark: this.state.remark
        }),
      });
      console.log(res);
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200 && resJson.status === 'success') {
        alert("表單送出成功!");
      } else {
        alert("表單送出失敗!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="modal fade" id="modal-lg">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.state.action}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="repairForm" onSubmit={this.handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fab">廠</label>
                        <input
                          name="fab"
                          value={this.state.fab}
                          onChange={(e) => this.setState({fab: e.target.value})}
                          className="form-control"
                          id="fab"
                          placeholder="輸入廠"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nbNumber">筆電編號</label>
                        <input
                          name="nbNumber"
                          value={this.state.nbNumber}
                          onChange={(e) => this.setState({nbNumber: e.target.value})}
                          className="form-control"
                          id="nbNumber"
                          placeholder="輸入筆電編號"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="formNo">申請單號</label>
                        <input
                          name="formNo"
                          value={this.state.formNo}
                          onChange={(e) => this.setState({formNo: e.target.value})}
                          className="form-control"
                          id="formNo"
                          placeholder="輸入申請單號"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>狀態</label>
                        <select
                          value={this.state.repairStatus}
                          onChange={(e) => this.setState({repairStatus: e.target.value})}
                          className="form-control"
                        >
                          {this.statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="col-form-label">
                          <i className="far fa-bell"></i>是否過保
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={this.state.checkedOverdate[0]}
                            onChange={(e) => this.setState({checkedOverdate: [true, false]})}
                            name="overdate"
                            value="是"
                          />
                          <label className="form-check-label">是</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={this.state.checkedOverdate[1]}
                            onChange={(e) => this.setState({checkedOverdate: [false, true]})}
                            name="overdate"
                            value="否"
                          />
                          <label className="form-check-label">否</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>登記日期</label>
                        <input
                          id="registerDate"
                          className="form-control"
                          placeholder="輸入登記日期"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="remark">補充說明</label>
                        <input
                          name="remark"
                          value={this.state.remark}
                          onChange={(e) => this.setState({remark: e.target.value})}
                          className="form-control"
                          id="formNo"
                          placeholder="登打補充說明"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    取 消
                  </button>
                  <button className="btn btn-primary">儲 存</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<RepairForm />, document.querySelector("#repairComponent"));
