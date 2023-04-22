curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO__LIVE__ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "From=$TWILIO__DEV__FROM_NUMBER" \
--data-urlencode "MessageServiceSid=$TWILIO__DEV__MESSAGING_SERVICE_SID" \
--data-urlencode "StatusCallback=$TWILIO__DEV__STATUS_CALLBACK" \
--data-urlencode "To=$TWILIO__TEST__REAL_TO_NUMBER" \
-u $TWILIO__LIVE__ACCOUNT_SID:$TWILIO__LIVE__AUTH_TOKEN