curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO__LIVE__ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "From=$TWILIO__PROD__MESSAGING_SERVICE_SID" \
--data-urlencode "MessageServiceSid=$TWILIO__PROD__STATUS_CALLBACK" \
--data-urlencode "StatusCallback=$TWILIO__PROD__FROM_NUMBER" \
--data-urlencode "To=$TWILIO__TEST__REAL_TO_NUMBER" \
-u $TWILIO__LIVE__ACCOUNT_SID:$TWILIO__LIVE__AUTH_TOKEN