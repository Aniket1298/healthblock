pragma solidity ^0.5.16;

contract Healthblock {
  address public owner;
  uint public number=0;
  uint report_count=0;
  mapping (address => doctor)  public doctors;
  mapping (address => patient) public patients;
  mapping (string => report) public reports; 
  mapping (uint=>report) reportlist;
  string public name = "Healthblock";
  struct report {
      uint id;
      string name;
      string report_hash;
      address owner;
      address[] doctors_assigned;
    }
  
  struct patient {
      string name;
      address id;
      string[] reports;
  }
  struct doctor {
      string name;
      address id;

  }
  constructor() public {
    owner = msg.sender;
  }
  function add() public returns(uint){
      number ++;
      return(number);
  }
  function hello(string memory _test) public returns(string memory){
      return (_test);   
  }
  function register(string memory _name, uint8 member) public returns(string memory,string memory){
    if (member==0){
        patient memory p = patients[msg.sender];
        require(!(p.id > address(0x0)));
        patients[msg.sender] = patient({name:_name,id:msg.sender,reports:new string[](0)});   
        return (_name,"patient");
        }
    else if (member==1){
      doctors[msg.sender] = doctor({name:_name,id:msg.sender});
      return (_name,"doctor");
        }
    }
  function getProfile(address _user) public  returns(string memory, string memory){
      patient memory p = patients[_user];
      doctor memory d = doctors[_user];
      if(p.id > address(0x0))
          return (p.name, 'patient');
      else if(d.id > address(0x0))
          return (d.name, 'doctor');
      else
          return (' ', '');
  }
  function uploadReport(string memory _name,string memory _reporthash) public {
    reports[_reporthash ]=report({id:report_count,name:_name,report_hash:_reporthash,owner:msg.sender,doctors_assigned:new address[](0)});
    patients[msg.sender].reports.push(_reporthash);
    report_count++;
  }
  
} 