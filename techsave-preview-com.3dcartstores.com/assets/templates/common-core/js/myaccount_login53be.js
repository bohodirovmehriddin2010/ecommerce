function calcHeight(){if(jQuery(".height").css("min-height","auto"),window.innerWidth>991){var n=jQuery(".alpha-col .height").outerHeight();jQuery(".height").css("min-height",n)}}function resetLoginPass(){jQuery("#Email4Password").val()!=""?document.forgotPass.submit():alert('To Reset your password, Please enter your email address and then click "'+GetLanguagItem("login_resetpasswordbutton")+'".')}function savePass(n){var t="";if(n.password.value.trim()==""&&(t+=" - New password cannot be blank.\n"),n.password2.value.trim()!=n.password.value.trim()&&(t+=" - Password confirmation doesn't match.\n"),n.password.value.match(/(?=^.{8,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/)||!0||(t+=" - [CustomerInfo_password_policy*script] does not match the password policy.\n"),n.randomWord.value.trim()==""&&(t+=" - Verification word cannot be blank.\n"),t!="")return alert(t),!1;n.submit()}$(function(){calcHeight()});jQuery(window).resize(function(){calcHeight()});jQuery(window).bind("orientationchange",function(){calcHeight()});String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}