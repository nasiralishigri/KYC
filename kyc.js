      var express = require('express')
      var app = express();
      var request = require("request");
      const fileUpload = require('express-fileupload');
       const cors = require('cors');
      app.use(fileUpload());
      app.use(cors());
   
      app.use(express.json());


      app.post('/user/login',(req,res)=>{  // login 
        console.log("user/login called");
      //  var m = req.body.m;
      //  var man = req.body.man;

// console.log("Man ",man+"    m  "+m);
      var options = {
        method: 'POST',
        url: 'https://sandbox.identitymind.com/im/account/login',
        qs: {graphScoreResponse: 'true'},
        headers: {accept: 'application/json', 'content-type': 'application/json'}
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
          res.send({success:true, msg: body});
          
        });
      })

  app.post('/consumer/upload',(req,res)=>{  // upload consumer document
          console.log("/consumer/upload called")
          var appId = req.query.appId;
          var file =req.query.file;
          var description =  req.query.description;

          var user =req.body.usr;
          var password= req.body.pass;
          var base64encodedData = Buffer.from(user + ':' + password).toString('base64');

        if(!appId || appId == null || !file || file ==null){
          console.log(" APPId "+appId +"  descrip  "+description+" file "+file)
          return res.send({success:false,msg:" please enter required fileds"});
        }
        console.log('https://sandbox.identitymind.com/im/account/consumer/'+appId+'/files')
      var options = {
        method: 'POST',
        url: 'https://sandbox.identitymind.com/im/account/consumer/'+appId+'/files',
       
        headers: {'content-type': 'application/json', 'Authorization': 'Basic ' + base64encodedData},
        body:{
          'file':file,
          'description':description
      },
      json:true
     
      };
      request(options, function (error, response, body) {
        if (error) { 
            res.send({"success":false,"msg":new Error(error)});
        }

        console.log(body);
        res.send({"Success":true,"msg":body})
      });
          
      })


  app.post('/consumer/resellerMarchant/upload',async(req,res)=>{  //Consumer KYC Document Upload by reseller on behalf of a merchant. Reseller to Upload a document and attach it to a merchant application

    try{
  var appId = req.query.appId;
  var merchant = req.query.merchant;
  var file = req.body.file;
  var description = req.body.description;


    var options = {
      method: 'POST',
      url: 'https://sandbox.identitymind.com/im/account/consumer/'+merchant+'/'+appId+'/files',
      headers: {'content-type': 'application/json'},
      body:{
        file:file,
        description:description
      }
    };
    
    console.log("URL "+ appId);
    return res.send({response:options})
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    }
    catch (err) {
      console.log(err);
    }
  })



  app.post('/consumer/evaluation',async(req,res)=>{               //Evaluate a consumer KYC for the provided user data

    var graphScoreResponse = req.query.graphScoreResponse;
    var man = req.body.man;   //Account Name for the user
    var tea = req.body.tea;   //Email address for the user
    var soc = req.body.soc;   // OAuth service that authenticated user. For example "google" or "facebook"
    var ip = req.body.ip;     // Customer's IP address
    var dfp = req.body.dfp;   //device finger print
    var dft = req.body.dft;   // Device fingerprint type  BC,IO,CB
    var bfn = req.body.bfn;   // Billing First Name 
    var bmn = req.body.bmn;   // Billing Middle Name
    var bln = req.body.bln;   // Billing last Name
    var bsn = req.body.bsn;   // Billing Street. Include house number, street name and apartment number
    var bco = req.body.bco;   // Billing Country. ISO 3166 Country code of the Billing Address of the transaction, encoded as a String. Default is “US”.
    var bz = req.body.bz;     // Billing Zip / Postal Code
    var bc = req.body.bc;     // Billing City
    var bs = req.body.bs;     // billing state
    var bgd = req.body.bgd;   // Billing Gender. M, F or Empty
    var bnbh = req.body.bnbh; // Billing Neighborhood
    var sfn = req.body.sfn;   // Shipping First Name
    var sln = req.body.sln;   // Shipping Last Name
    var ssn = req.body.ssn;   // Shipping Street. Include house number, street name and apartment number
    var sco = req.body.sco;   //Shipping Country. ISO 3166 Country code encoded as a String. For MSB transfer mode (default) it is the country of the billing address of the beneficiary. For MarketPlace transfer mode it is the country of the shipping address of the originator.
    var sz = req.body.sz;    // Shipping Zip / Postal Code
    var sc = req.body.sc;    // Shipping City
    var ss = req.body.ss;    // Shipping State
    var clong = req.body.clong; // Customer longitude
    var clat = req.body.clat;  // Customer latitude
    var blg = req.body.blg;   // Customer Browser Language
    var aflid = req.body.aflid; // Affiliate Id. The client specific identifier for the affiliate that generated this transaction
    var aflsd = req.body.aflsd;  // The signup/affiliate creation date of the affiliate associated with this transaction. Either a ISO8601 encoded string or a unix timestamp.
    var phn = req.body.phn;  // Customer primary phone number
    var pm = req.body.pm;   //  Customer mobile phone number
    var pw = req.body.pw;   //Customer work phone number
    var tti = req.body.tti;  //Transaction Time in UTC. Encoded either as a Unix timestamp, or ISO8601 string. Do not include milliseconds.
    var tid = req.body.tid;  // Transaction Identifier. If not provided, an id will be allocated internally by IDM.
    var pccn = req.body.pccn;  //Credit Card unique identifier (Hash). IdentityMind will supply procedure to generate hash
    var pcct = req.body.pcct; // A masked or tokenized version of the credit card number. IdentityMind will supply procedure to generate token.
    var pcty = req.body.pcty; // The type of the card
    var phash = req.body.phash; // Generic payment account unique identifier (Hash). This is used when IdentityMind does not natively support the payment type.
    var ptoken = req.body.ptoken; // A masked or tokenized version of the account token.
    var pach = req.body.pach;  // ACH account unique identifier (Hash).
    var pbc = req.body.pbc;  // A virtual currency address for the funding source. For example Bitcoin P2PKH, P2SH or Bech32 address
    var profile = req.body.profile; //The policy profile to be used to evaluate this transaction. Prior to IDMRisk 1.18 this was encoded in the smna and smid fields
    var smna = req.body.smna;  //
    var memo = req.body.memo;  //  Free form memo field for client use
    var m = req.body.m;   //Merchant Identifier. Used when a reseller is proxying requests for their merchant's. Please contact IdentityMind support for further details of the usage of this field.
    var accountCreationTime = req.body.accountCreationTime; //User account creation time at the merchant in UTC. Encoded as a Unix timestamp or ISO 8601 string. Data containing milliseconds will not be accepted.
    var sdcad = req.body.sdcad; // []  List of Source Digital Currency Addresses
    var ddcad = req.body.ddcad; //List of Destination Digital Currency Addresses
    var dcth = req.body.dcth;   // Digital Currency Transaction Hash
    var timezone = req.body.timezone; // The timezone in which the transaction was initiated. The value should be a valid Java TimeZone ID.
    var tags = req.body.tags;   // An array of tags to be applied to the transaction
    var scanData = req.body.scanData; // Required if using Document Verification, the document front side image data, Base64 encoded. If provided this will override the configured “Jumio client integration”. 5MB maximum size.
    var backsideImageData = req.body.backsideImageData; //If using Document Verification, the document back side image data, Base64 encoded. 5MB maximum size.
    var faceImages = req.body.faceImages; // If using Document Verification, a serialized JSON array of face image data, Base64 encoded. 5MB maximum size.
    var croppedImage = req.body.croppedImage; // Optional in Document Verification. true if documents are cropped already. false if not being provided
    var stage = req.body.stage;  // Stage of application being processed. An integer between 1 and 5. If not provided, defaults to 1.
    var merchantAid = req.body.merchantAid; // If this individual is linked to a merchant (business) as one of the owners of the business, this parameter should match the exact application ID of the merchant
    var personalguarantee = req.body.personalguarantee; // If this individual is linked to a merchant (business) as one of the owners of the business, whether the individual provides a personal guarantee of debt
    var ownership = req.body.ownership;  // If this individual is linked to a merchant (business) as one of the owners of the business, the percentage of ownership
    var title = req.body.title; //  Title of the applicant
    var docCountry = req.body.docCountry; //Required if using Document Verification, the country in which the document was issued in.
    var docType = req.body.docType;  // Required if using Document Verification, the Type of the Document - Passport (PP) | Driver's Licence (DL) | Government issued Identity Card (ID) |Residence Permit (RP) | Utility Bill (UB)
    var dob = req.body.dob; // Applicant's date of birth encoded either as a Unix timestamp, or ISO8601 string format are supported
    var assn = req.body.assn;  //The applicant's social security number or national identification number. It is a structed string defined as [ISO-3166-1 (alpha-2)]:[national id].For example "US:123456789" represents a United States Social Security Number. For backwards compatibility if no country code is provided then the identifier is assumed to be a US SSN.
    var assn1 = req.body.assn1; // The applicant's additional social security number or national identification number. It has the same format as assn
    var assn2 = req.body.assn2;  //The applicant's additional social security number or national identification number. It has the same format as assn
    var assnl4 = req.body.assnl4; // Last 4 digits of the applicant's social security number or national identification number. If you wish to display the assn4l on the UI, both assn4l and assn values must be present in this request.
    var smid = req.body.smid;   //
    var avs_result = req.body.avs_result;  // AVS Result value from the Gateway.
    var dfp = req.body.dfp; // Device fingerprint blob
    var dft = req.body.dft; //  Device fingerprint type

    var user =req.body.usr;
    var password= req.body.pass;
    var base64encodedData = Buffer.from(user + ':' + password).toString('base64');
    console.log(base64encodedData)
//  console.log("accountname "+accountname+" email  "+email)
    var options = {
      method: 'POST',
      url: 'https://sandbox.identitymind.com/im/account/consumer?',
      qs: {graphScoreResponse: 'false'},
      headers: {accept: 'application/json', 'content-type': 'application/json',  'Authorization': 'Basic ' + base64encodedData},
      body:{
        man:  man,
        tea:  tea,
        bfn:  bfn,
        bmn:  bmn,
        bln:  bln,
        bsn:  bsn,
        // bco:   bco ,
        bz :   bz ,
        bc :   bc ,
        bs :   bs ,
        bgd:   bgd,
        bnbh:   bnbh,
        sfn:   sfn,
        sln:   sln,
        ssn:   ssn,
        // sco:   sco,
        sz :   sz ,
        sc :   sc ,
        ss :   ss ,
        clong : clong,
        clat : clat ,
        blg : blg ,
        aflid : aflid, 
        aflsd : aflsd ,
        phn: phn,
        pm : pm ,
        pw : pw ,
        tti : tti, 
        tid : tid ,
        pccn : pccn, 
        pcct : pcct ,
        // phash : phash, 
        // ptoken: ptoken,
        // pach : pach ,
        pbc : pbc ,
        // profile : profile,
        // smna : smna,
        memo : memo,
        // m : m,
        // accountCreationTime: accountCreationTime,
        // sdcad:sdcad,
        // ddcad: ddcad,
        // dcth:dcth,
        timezone:timezone,
        // tags:tags,
        // scanData:scanData,
        // backsideImageData:backsideImageData,
        // faceImages:faceImages,
        // croppedImage:croppedImage,
        stage:stage,
        // merchantAid:merchantAid,
        // personalguarantee:personalguarantee,
        ownership :ownership,
        title :title,
        // docCountry:docCountry,
        // docType:docType,
        dob:dob,
        // assn,assn,
        // assn1:assn1,
        // assn2 :assn2,
        // assnl4:assnl4,
        smid:smid,
        avs_result:avs_result,
        dfp :dfp,
        dft:dft


      },
      json: true
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send({success:true,msg:body})
    });
  })

  app.post('/consumer/getapplicationtag',async(req,res)=>{     //Get tags of an Application

    var mtid =req.body.mtid;
    console.log("mtid "+mtid)

  var options = {
    method: 'GET',
    url: 'https://sandbox.identitymind.com/im/account/consumer/'+mtid+'/tags',
    headers: {accept: 'application/json',  'Authorization': 'Basic dG9rZW5pc206ZWE1ZTExYmM5MTg3ZGQzMDJhOGJiYzc4YTE5ZTc2ODY1NjhhYzhlMQ=='}
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    res.send({success:true,res: body})
  });
  })

  app.post('/consumer/quizresponse',async(req,res)=>{ // Provide a quiz response on the named KYC

  var tid = req.params.kycid;
  var answer =req.body.answer;
  var smsCode = req.body.smsCode;

    var options = {
      method: 'POST',
      url: 'https://sandbox.identitymind.com/im/account/consumer/'+tid+'/quizresponse',
      headers: {'content-type': 'application/json'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
  })

  app.post('/consumer/verfication/uploadimage',async(req,res)=>{  //Upload. Upload an image to an application for document verification.

    var appId = req.params.appId;
  var image = req.files.image;
  var description = req.body.description;

    var options = {
      method: 'POST',
      url: 'https://sandbox.identitymind.com/im/account/consumer/'+appId+'/dv',
      headers: {'content-type': 'application/json'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
  })
  
  app.post('/consumer/appattr',async(req,res)=>{     // Get attributes of an application.
    var mtid = req.body.mtid;

    var options = {
      method: 'GET',
      url: 'https://sandbox.identitymind.com/im/account/consumer/'+mtid+'/attributes',
      headers: {accept: 'application/json',  'Authorization': 'Basic dG9rZW5pc206ZWE1ZTExYmM5MTg3ZGQzMDJhOGJiYzc4YTE5ZTc2ODY1NjhhYzhlMQ=='}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send({success:true,msg:body})
    });
  })





      app.listen(2000);
      console.log("Running on localhost:2000")