function showReview(n,t,i,r,u,f,e,o,s,h,c,l){u=jQuery("#review_item"+t).data("review-sd");f=jQuery("#review_item"+t).data("review-ld");e=jQuery("#review_item"+t).data("product-name");h=jQuery("#review_item"+t).data("name");jQuery("#createreview-modal").modal("show");jQuery("#createreview-shorReview").val(u);jQuery("#createreview-longReview").val(f);jQuery("#createreview-userCity").val(o);jQuery("#createreview-custEmail").val(s);jQuery("#createreview-custName").val(h);jQuery("#rating-input-1-"+i).prop("checked",!0);jQuery("#reviewImageList").empty();intReviewId=t;intCatalogId=n;var v=c.split("-||-"),a="";v.forEach(function(i){var r,f;if(i!=undefined&&i!=""){var e=i.split("|--|"),o=e[0],u=e[1];a!=""&&(a+=",");a+=u;r=document.createElement("li");r.setAttribute("class","review-image-col");r.setAttribute("id","liFile"+o);f="<a href='assets/product_review_files/"+u+"' class='MagicZoomPlus' target='_blank'><img src='thumbnail.asp?file=assets/product_review_files/"+u+"&amp;maxx=100&amp;maxy=0' border='0' width='100' height='100'><\/a>";l&&(f+="<a href='javascript:void(0);' class='btn btn-xs btn-default btn-center-delete-review-image' onclick='deleteOneFile(\""+u+'", '+t+", "+o+", "+n+");'>&times;<\/a>");r.innerHTML=f;reviewImageList.appendChild(r)}});jQuery("#fileattachment").val(a);list=a.split(",");list=list.filter(function(n){return n!==""})}function sendReviewRequest(){var r=jQuery("#createreview-modal .rating-input:checked").val(),u=jQuery.trim(jQuery("#createreview-custName").val()),f=jQuery.trim(jQuery("#createreview-custEmail").val()),e=jQuery.trim(jQuery("#createreview-userCity").val()),s=jQuery.trim(jQuery("#createreview-shorReview").val()),o=jQuery.trim(jQuery("#createreview-longReview").val()),h=jQuery.trim(jQuery("#fileattachment").val()),c=jQuery.trim(jQuery('#createreview-modal input[name="ramdomWord"]').val()),l=jQuery.trim(jQuery('#createreview-modal input[name="recaptcha_response_field"]').val()),a=jQuery.trim(jQuery('#createreview-modal input[name="recaptcha_challenge_field"]').val()),v=jQuery.trim(jQuery('#createreview-modal  [name="g-recaptcha-response"]').val()),t=!0,n="",i;if((r==""||r==undefined)&&(n+="Please select the stars rating. \n",t=!1),(u==""||u.length>50)&&(n+="Please enter your First and Last Name. Max length for Name is 50. \n",t=!1),(f==""||f.length>100)&&(n+="Please enter your E-mail. Max length for Email is 100. \n"),(e==""||e.length>50)&&(n+="Please enter your City. Max length for City is 50. \n",t=!1),s==""&&(n+="Please enter your review title. \n",t=!1),(o==""||o.length>2500)&&(n+="Please enter your review. Max length for Review is 2500. \n",t=!1),jQuery("#gdpr_privacy_enforced").val()=="1"&&(jQuery('#createreview-modal input[name="privacy_accepted"]').is(":checked")||(n+=GetLanguagItem("gdpr_privacy-policy-validation-message")+"\n",t=!1)),t){if(jQuery("#createreview-recaptchaRobot").data("size")=="invisible"&&jQuery("#createreview-recaptchaRobot textarea").val()==""){processCaptchaEexcute("createreview-modal","createreview_normal");return}i=jQuery("#catalogid").val();i==undefined&&(i=intCatalogId);jQuery("#createreview-modal .loading-overlay").show();jQuery.ajax({method:"POST",url:"/review.asp?action=ajax&catalogid="+i,data:{ajaxAction:"create",user_name:u,user_email:f,user_city:e,short_review:s,long_review:o,rating:r,fileattachment:h,reviewid:intReviewId,ramdomWord:c,recaptcha_response_field:l,recaptcha_challenge_field:a,"g-recaptcha-response":v},success:function(n){var t=JSON.parse(n);t.resCode!=undefined&&(jQuery("#createreview-modal .loading-overlay").hide(),t.resCode==1?(jQuery("#createreview-modal .modal-response").fadeIn(500),refereshAllCaptchas()):alert(t.resMsg))},error:function(){alert("Something went wrong. Please try again later.")},complete:function(){jQuery("#createreview-modal .loading-overlay").fadeOut(500)}})}else{jQuery("#createreview-modal .loading-overlay").fadeOut(500);alert(n);return}}function createreview_normal(){}function createreview_invisible(){sendReviewRequest()}function ReviewSortingChange(n,t,i,r){(n==undefined||n==0)&&(n=intRatingStarsStored);var f="",u="";jQuery("#review-load-spinner").show();i==!0&&(intOffSetNext=intOffSetNext-LoadCount*intRowsToLoadMore-1,t=undefined,LoadCount=0);currentStarsFilter==null||n!=currentStarsFilter&&(intOffSetNext=0,LoadCount=0);switch(t){case-1:intOffSetNext=0;LoadCount=0;break;case undefined:break;default:intOffSetNext=LoadCount*intRowsToLoadMore+1}u="itemid="+add.item_id.value;r==!0?(u+="&offset=1&viewall=1",intOffSetNext=999,document.getElementById("filteredSearchResults")!=null&&(document.getElementById("filteredSearchResults").style.display="none")):(u+="&offset="+intOffSetNext,u+="&ratingstars="+n);add.category_id!=undefined&&(u+="&categoryid="+add.category_id.value);add.review_sorting!=undefined&&(u+="&reviewsorting="+add.review_sorting.options[add.review_sorting.selectedIndex].value);f="reviewSorting_ajax.asp?"+u+"&no-cache="+Math.random();jQuery.ajax({url:f,dataType:"html",type:"GET",cache:!1,success:function(n){n!=""&&(strResultBefore="",strResultContent=$($($.parseHTML(n)).filter("#reviewsBlock")).html(),strResultContent==undefined&&(strResultContent=n),t>0&&(strResultBefore=jQuery("#reviewsBlock").html()),n='<div id="reviewsBlock" class="reviewsBlock" itemprop="review" itemscope="" itemtype="http://schema.org/Review">'+strResultBefore+strResultContent+"<\/div>",jQuery("#reviewsBlock").replaceWith(n),jQuery("#reviewsBlock").show(),jQuery("#review-load-spinner").hide(),CheckLoadMore(),typeof MagicZoom!="undefined"&&MagicZoom.refresh())}});LoadCount++;intOffSetNext=LoadCount*intRowsToLoadMore+1;currentStarsFilter=n}function deleteFile(n){var i=confirm(GetLanguagItem("product_review_images_confirm_delete"));if(i){jQuery.get("filesaction.asp",{action:"delete",file:n,hid:"[filehash]",folder:"temp",confirm:!0,crmid:0},function(n){try{var t=n.errorMsg;if(t!=""&&t!=undefined)return alert(t),!1}catch(i){}});jQuery("#progress .bar").css("width","0%");var t=n.substr(0,n.lastIndexOf("."))||n,t=t.replace("(","\\("),t=t.replace(")","\\)");jQuery("."+t).remove();list.splice(list.indexOf(n),1);jQuery("#fileattachment").val(list)}return!1}function deleteOneFile(n,t,i,r){var u=confirm(GetLanguagItem("product_review_images_confirm_delete"));return u&&(jQuery.get("review.asp",{action:"deleteImage",file:n,hid:jQuery("#hdnFileHash").val(),confirm:!0,review_id:t,image_id:i,catalogid:r,hdnSecurityToken:"[securityToken]"},function(n){try{if(n!=""&&n!=undefined)return alert(n),!1}catch(t){}}),jQuery("#liFile"+i).addClass("strikeout").slideUp(),list.splice(list.indexOf(n),1),jQuery("#fileattachment").val(list)),!1}var LoadCount,currentStarsFilter;jQuery(".createreview-link").click(function(n){n.preventDefault();var t=parseInt(jQuery(this).data("review_login"));if(t==1||t==2){window.location.href="/myaccount.asp?catalogid="+jQuery("#catalogid").val();return}jQuery("#createreview-modal").modal("show")});jQuery("#createreview_button").click(function(){sendReviewRequest()});intRatingStarsStored=0;LoadCount=1;currentStarsFilter=0;var bUploading=!1,list=[],intReviewId=0,intCatalogId=0;jQuery(function(){jQuery("#fileattachment").length>0&&(list=jQuery("#fileattachment").val().split(","),list=list.filter(function(n){return n!==""}));jQuery("#fileupload").fileupload({dataType:"json",add:function(n,t){var i="",r="",u=0;if(jQuery("#fileattachment").val()!=""&&(u=jQuery("#fileattachment").val().split(",").length),t.originalFiles.length>4||t.originalFiles.length+u>4)return alert(GetLanguagItem("product_review_images_limit")),!1;r=t.files[0].name;r.lastIndexOf(".")>0&&(i=r.substring(r.lastIndexOf(".")+1,r.length),i.toLowerCase()=="gif"||i.toLowerCase()=="jpg"||i.toLowerCase()=="jpeg"||i.toLowerCase()=="png"?t.submit():alert(GetLanguagItem("product_review_images_extension")))},done:function(n,t){jQuery("#allelements").empty();jQuery("#fileattachment").empty();jQuery.each(t.result.files,function(n,t){var i=t.uniqueFileName.substr(0,t.uniqueFileName.lastIndexOf("."))||t.uniqueFileName,r="<span onclick='deleteFile(\""+t.uniqueFileName+"\");'><i class='icon-cancel'><\/i><\/span>",u="filesaction.asp?action=download&hid=[filehash]&folder=temp&file="+t.uniqueFileName+"";jQuery("#files").append('<p id="'+t.uniqueFileName+'"  class="'+i+'"  ><a id='+i+" href= "+u+">"+t.name+'<\/a><span class="item-remove" >'+r+"<\/span><\/p>");list.push(t.uniqueFileName)});jQuery("#fileattachment").val(list)},progressall:function(n,t){bUploading=!0;var i=parseInt(t.loaded/t.total*100,10);i>=100&&(bUploading=!1);jQuery("#progress .bar").css("width",i+"%")}})})