curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO__TEST__ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "From=$TWILIO__TEST__MAGIC_SUCCESS_FROM_NUMBER" \
--data-urlencode "StatusCallback=$TWILIO__DEV__STATUS_CALLBACK" \
--data-urlencode "To=$TWILIO__TEST__REAL_TO_NUMBER" \
-u $TWILIO__TEST__ACCOUNT_SID:$TWILIO__TEST__AUTH_TOKEN