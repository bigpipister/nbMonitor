const BorrowForm = (props) => {
  const { useState } = React
  const [fab, setFab] = useState("")
  const [dep, setDep] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [name, setName] = useState("")
  const [nbNumber, setNbNumber] = useState("")
  const partValues = ['滑鼠','充電線','筆電包','網路線','其它']
  const [checkedParts, setCheckedParts] = useState(
    new Array(partValues.length).fill(false)
  );
  const actionValues = ['借用','歸還','續借']
  const [checkedActions, setCheckedActions] = useState(
    [true, false, false]
  );
  const problemValues = ['藍屏','黑屏','重開','WIFI連不上','其它原因']
  const [checkedProblems, setCheckedProblems] = useState(
    new Array(problemValues.length).fill(false)
  );

  let handleSubmit = async (e) => {
    let parts = []
    let action = ""
    let problems = []

    partValues.forEach((item, index) => {
      if(checkedParts[index] === true) {
        parts.push(item)
      }
    })

    actionValues.forEach((item, index) => {
      if(checkedActions[index] === true) {
        action = item
      }
    })

    problemValues.forEach((item, index) => {
      if(checkedProblems[index] === true) {
        problems.push(item)
      }
    })

    const confirmText = 
      '廠: ' + fab + "\n" +
      '部門: ' + dep + "\n" +
      '工號: ' + employeeId + "\n" +
      '姓名: ' + name + "\n" +
      '筆電編號: ' + nbNumber + "\n" +
      '筆電配件: ' + parts.join('、') + "\n" +
      '問題反饋: ' + problems.join('、');
    let confirmDialog = confirm(confirmText);
    if (!confirmDialog) {
      return;
    }
    e.preventDefault();
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    var hours = String(today.getHours()).padStart(2, '0')
    var mins = String(today.getMinutes()).padStart(2, '0')
    var secs = String(today.getSeconds()).padStart(2, '0')
    const currentTime = yyyy + '/' + mm + '/' + dd + ' ' + hours + ':' + mins + ':' + secs
    try {
      let res = await fetch("http://localhost/rentRecord", {
        method: "POST",
        body: JSON.stringify({
          fab: fab,
          dep: dep,
          employeeId: employeeId,
          name: name,
          nbNumber: nbNumber,
          parts: parts,
          action: action,
          problems: problems,
          currentTime: currentTime
        }),
      });
      console.log(res);
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200 && resJson.status === 'success') {
        setFab("");
        setDep("");
        setEmployeeId("");
        setName("");
        setNbNumber("");
        parts = []
        action = ""
        problems = []
        alert("表單送出成功!");
      } else {
        alert("表單送出失敗!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleChangeForParts = (position) => {
    const updatedCheckedState = checkedParts.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedParts(updatedCheckedState);
  }

  let handleChangeForActions = (position) => {
    let updatedCheckedState = [false, false, false]
    updatedCheckedState[position] = true
    setCheckedActions(updatedCheckedState)
  }

  let handleChangeForProblems = (position) => {
    const updatedCheckedState = checkedProblems.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedProblems(updatedCheckedState);
  }

  return (
    <form id="borrowForm" onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="fab">廠</label>
              <input
                name="fab"
                value={fab}
                onChange={(e) => setFab(e.target.value)}
                className="form-control"
                id="fab"
                placeholder="輸入廠"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dep">部門</label>
              <input
                name="dep"
                value={dep}
                onChange={(e) => setDep(e.target.value)}
                className="form-control"
                id="dep"
                placeholder="輸入部門"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeId">工號</label>
              <input
                name="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="form-control"
                id="employeeId"
                placeholder="輸入工號"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">姓名</label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="name"
                placeholder="輸入姓名"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nbNumber">筆電編號</label>
              <input
                name="nbNumber"
                value={nbNumber}
                onChange={(e) => setNbNumber(e.target.value)}
                className="form-control"
                id="nbNumber"
                placeholder="輸入筆電編號"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-form-label">
                <i className="fas fa-check"></i>筆電配件
              </label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedParts[0]}
                       onChange={e => handleChangeForParts(0)} 
                       name="part" value="滑鼠" />
                <label className="form-check-label">滑鼠</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedParts[1]}
                       onChange={e => handleChangeForParts(1)} 
                       name="part" value="充電線" />
                <label className="form-check-label">充電線</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedParts[2]}
                       onChange={e => handleChangeForParts(2)} 
                       name="part" value="筆電包" />
                <label className="form-check-label">筆電包</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedParts[3]}
                       onChange={e => handleChangeForParts(3)} 
                       name="part" value="網路線" />
                <label className="form-check-label">網路線</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedParts[4]}
                       onChange={e => handleChangeForParts(4)}
                       name="part" value="其它" />
                <label className="form-check-label">其它</label>
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <i className="far fa-bell"></i>借用/歸還/續借
              </label>
              <div className="form-check">
                <input
                  className="form-check-input" type="radio"
                  checked={checkedActions[0]}
                  onChange={e => handleChangeForActions(0)} 
                  name="action" value="借用"
                />
                <label className="form-check-label">借用</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input" type="radio"
                  checked={checkedActions[1]}
                  onChange={e => handleChangeForActions(1)} 
                  name="action" value="歸還"
                />
                <label className="form-check-label">歸還</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input" type="radio"
                  checked={checkedActions[2]}
                  onChange={e => handleChangeForActions(2)} 
                  name="action" value="續借"
                />
                <label className="form-check-label">續借</label>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-form-label">
                <i className="far fa-times-circle"></i>問題反饋
              </label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedProblems[0]}
                       onChange={e => handleChangeForProblems(0)} 
                       name="problem" value="藍屏" />
                <label className="form-check-label">藍屏</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedProblems[1]}
                       onChange={e => handleChangeForProblems(1)} 
                       name="problem" value="藍屏" />
                <label className="form-check-label">黑屏</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedProblems[2]}
                       onChange={e => handleChangeForProblems(2)} 
                       name="problem" value="藍屏" />
                <label className="form-check-label">重開</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedProblems[3]}
                       onChange={e => handleChangeForProblems(3)} 
                       name="problem" value="藍屏" />
                <label className="form-check-label">WIFI連不上</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       checked={checkedProblems[4]}
                       onChange={e => handleChangeForProblems(4)} 
                       name="problem" value="其它原因" />
                <label className="form-check-label">其它原因</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary">
          送出
        </button>
      </div>
    </form>
  );
};

ReactDOM.render(<BorrowForm />, document.querySelector("#borrowComponent"));

$.validator.setDefaults({
  submitHandler: async function () {
    try {
      //alert("表單送出成功!");
    } catch (err) {
      console.log(err);
    }
  },
});
$("#borrowForm").validate({
  rules: {
    fab: {
      required: true,
    },
    dep: {
      required: true,
    },
    employeeId: {
      required: true,
    },
    name: {
      required: true,
    },
    nbNumber: {
      required: true,
    },
  },
  messages: {
    fab: {
      required: "請輸入廠名",
    },
    dep: {
      required: "請輸入部門名",
    },
    employeeId: {
      required: "請輸入工號",
    },
    name: {
      required: "請輸入姓名",
    },
    nbNumber: {
      required: "請輸入筆電編號",
    },
  },
  errorElement: "span",
  errorPlacement: function (error, element) {
    error.addClass("invalid-feedback");
    element.closest(".form-group").append(error);
  },
  highlight: function (element, errorClass, validClass) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass("is-invalid");
  },
});
