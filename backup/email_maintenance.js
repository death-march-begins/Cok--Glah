'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Imap = require('imap');
var inspect = require('util').inspect;
var fs = require('fs');
const simpleParser = require('mailparser').simpleParser;
const Config = use('Config')

class MailboxController {
  async index({ auth, request, response, view }) {
    const user = auth.user.toJSON()
    let readEmail = await this.readEmail()
    //console.log(readEmail)
    return view.render('email/mailbox', {user: user})
  }
  
  async readEmail(){
    var jsonStr = { file: [] };
    var imap = new Imap({
      user: 'gunawanbudi930@gmail.com',
      password: 'black&whites',
      host: 'smtp.gmail.com',
      port: 993,
      tls: true
    });
    imap.once("ready", execute);
    
    imap.once("error", function(err) {
      console.log("Connection error: " + err.stack);
    });
    
    await imap.connect();
    //console.log(jsonStr)
    
    
    function execute() {
      imap.openBox("INBOX", false, function(err, mailBox) {
        if (err) {
          console.error(err);
          return;
        }
        imap.search([['HEADER','SUBJECT', 'Peminjaman']], function(err, results) {
          if(!results || !results.length){console.log("No mails");imap.end();return;}
          /* mark as seen
          imap.setFlags(results, ['\\Seen'], function(err) {
            if (!err) {
              console.log("marked as read");
            } else {
              console.log(JSON.stringify(err, null, 2));
            }
          });*/
          //console.log(results)
          var f = imap.fetch(results, { 
            bodies: "" 
          });
          
          
          f.on("message", function(msg, seqno){
            console.log("Processing msg #" + seqno);
            var prefix = '(#' + seqno + ') ';
            msg.on('body',function(stream, info) {
              // use a specialized mail parsing library (https://github.com/andris9/mailparser)        
              simpleParser(stream, (err, mail) => {
                jsonStr.file.push({"address":mail.from.value[0].address,"subject":prefix + mail.subject, "msg": prefix + mail.text });
                // console.log(mail.from.value[0].address)
                // console.log(prefix + mail.subject);
                // console.log(prefix + mail.text);
              }) 
              
            })           
            msg.once('attributes', function(attrs) {
              console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            });
            msg.once('end', function() {
              
              console.log(prefix + 'Finished');
            });
          });
          
          f.once("error", function(err) {
            console.log('Fetch error: ' + err);
          });
          f.once("end", function() {
            console.log("Done fetching all unseen messages.");
            console.log(jsonStr)
            imap.end();
          });
          
        });
        
      });
    }
  }
  
}

module.exports = MailboxController
