package com.rz.googlepayplugin;

import androidx.annotation.NonNull;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.Wallet;
import com.google.android.gms.wallet.WalletConstants;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

public class RzGooglePay extends CordovaPlugin {

    private static final String TAG=RzGooglePay.class.getName();

    private PaymentsClient paymentsClient;
    private boolean clientReadyToPay = false;
    private String lastError = "";

    private static final BigDecimal CENTS_IN_A_UNIT = new BigDecimal(100d);
    private static final int LOAD_PAYMENT_DATA_REQUEST_CODE = 991;
    private static final int PAYMENTS_ENVIRONMENT = WalletConstants.ENVIRONMENT_TEST;
    private static final List<String> SUPPORTED_NETWORKS = Arrays.asList(
            "AMEX",
            "DISCOVER",
            "JCB",
            "MASTERCARD",
            "VISA");

    private static final List<String> SUPPORTED_METHODS = Arrays.asList(
            "PAN_ONLY",
            "CRYPTOGRAM_3DS");

    private static final String DEFAULT_COUNTRY_CODE = "US";
    private static final String DEFAULT_CURRENCY_CODE = "USD";
    private static final List<String> SHIPPING_SUPPORTED_COUNTRIES = Arrays.asList("US", "GB");

    private CallbackContext callbackContext;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        Log.d(TAG,"initialize");
        super.initialize(cordova, webView);
        initializePlugin();
    }

    @Override
    public void pluginInitialize(){
        Log.d(TAG,"pluginInitialize");
        super.pluginInitialize();
        initializePlugin();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG,"execute: "+action);
        this.callbackContext=callbackContext;
        try{
            if (action.equals("pay")) {
                JSONObject obj = args.getJSONObject(0);
                startPayment(obj);
                return true;
            }
        }catch(Exception ex){
            ex.printStackTrace();
            Log.e(TAG,ex.getMessage());
            handlePaymentError(0,ex.getMessage());
            return true;
        }
        return false;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d(TAG,"onActivityResult: "+String.valueOf(requestCode));
        switch (requestCode) {
            case LOAD_PAYMENT_DATA_REQUEST_CODE:
                switch (resultCode) {
                    case Activity.RESULT_OK:
                        Log.d(TAG,"OK");
                        PaymentData paymentData = PaymentData.getFromIntent(data);
                        handlePaymentSuccess(paymentData);
                        break;
                    case Activity.RESULT_CANCELED:
                        Log.e(TAG,"Cancelled");
                        Status status2 = AutoResolveHelper.getStatusFromIntent(data);
                        //409 statuscode means that google account needs to setup
                        handlePaymentError(status2.getStatusCode(),status2.getStatusMessage());
                        break;
                    case AutoResolveHelper.RESULT_ERROR:
                        Log.e(TAG,"Error");
                        Status status = AutoResolveHelper.getStatusFromIntent(data);
                        handlePaymentError(status.getStatusCode(),status.getStatusMessage());
                        break;
                }
        }
        super.onActivityResult(requestCode,resultCode,data);
    }

    private void handlePaymentSuccess(PaymentData paymentData) {
        Log.d(TAG,"handlePaymentSuccess");
        try {
            String paymentInfo = paymentData.toJson();
            callbackContext.success(paymentInfo);
        } catch (Exception ex) {
            ex.printStackTrace();
            Log.e(TAG,ex.getMessage());
            handlePaymentError(0,ex.getMessage());
        }
    }

    private void handlePaymentError(int statusCode,String statusMessage) {
        Log.d(TAG,"handlePaymentError");
        if (statusMessage==null){
            statusMessage="";
        }
        Log.e(TAG,statusCode+"::"+statusMessage);
        try{
            JSONObject obj=new JSONObject();
            obj.put("status",statusCode);
            obj.put("message",statusMessage);
            callbackContext.error(obj);
        }catch(Exception ex){
            ex.printStackTrace();
            Log.e(TAG,"Exception: "+ex.getMessage());
        }
    }

    private void initializePlugin(){
        Log.d(TAG,"initializePlugin");
        try {
            paymentsClient = createPaymentsClient(this.cordova.getActivity());
            JSONObject isReadyToPayJson = getBaseRequest();
            isReadyToPayJson.put("allowedPaymentMethods", new JSONArray().put(getBaseCardPaymentMethod()));
            checkIsReadyToPay(isReadyToPayJson);
        }catch(Exception ex){
            ex.printStackTrace();
            Log.e(TAG,"Exception: "+ex.getMessage());
            lastError=ex.getMessage();
            clientReadyToPay=false;
            handlePaymentError(0,ex.getMessage());
        }
    }

    private void checkIsReadyToPay(JSONObject isReadyToPayJson) {
        Log.d(TAG,"checkIsReadyToPay");
        IsReadyToPayRequest request = IsReadyToPayRequest.fromJson(isReadyToPayJson.toString());
        Task<Boolean> task = paymentsClient.isReadyToPay(request);
        task.addOnCompleteListener(this.cordova.getActivity(),
                new OnCompleteListener<Boolean>() {
                    @Override
                    public void onComplete(@NonNull Task<Boolean> task) {
                        if (task.isSuccessful()) {
                            Log.d(TAG,"task.isSuccessful()");
                            clientReadyToPay=true;
                            lastError = "";
                        } else {
                            Log.e(TAG,"isReadyToPay failed: "+task.getException());
                            task.getException().printStackTrace();
                            clientReadyToPay=false;
                            lastError="isReadyToPay failed: "+task.getException().getMessage();
                        }
                    }
                });
    }

    private void startPayment(JSONObject params) {
        Log.d(TAG, "startPayment");
        if (!clientReadyToPay) {
            handlePaymentError(0,lastError);
            return;
        }
        try {
            double amount = params.getDouble("amount");
            long amountCents = Math.round(amount * CENTS_IN_A_UNIT.longValue());
            JSONObject paymentDataRequest = getBaseRequest();

            JSONObject cardPaymentMethod = getBaseCardPaymentMethod();
            cardPaymentMethod.put("tokenizationSpecification", getGatewayTokenizationSpecification());
            paymentDataRequest.put("allowedPaymentMethods", new JSONArray().put(cardPaymentMethod));

            JSONObject transactionInfo = new JSONObject();
            transactionInfo.put("totalPrice",centsToString(amountCents));
            transactionInfo.put("totalPriceStatus", "FINAL");
            String countryCode = params.has("country_code")?params.getString("country_code"):DEFAULT_COUNTRY_CODE;
            String currencyCode = params.has("currency_code")?params.getString("currency_code"):DEFAULT_CURRENCY_CODE;
            transactionInfo.put("countryCode",countryCode);
            transactionInfo.put("currencyCode",currencyCode);
            transactionInfo.put("checkoutOption", "COMPLETE_IMMEDIATE_PURCHASE");
            paymentDataRequest.put("transactionInfo",transactionInfo);

            JSONObject merchantInfo = new JSONObject();
            merchantInfo.put("merchantName", "hairday, inc.");
            paymentDataRequest.put("merchantInfo",merchantInfo);

            PaymentDataRequest request = PaymentDataRequest.fromJson(paymentDataRequest.toString());
            if (request==null){
                Log.e(TAG,"request is null");
                handlePaymentError(0,"PaymentDataRequest is null");
                return;
            }
            AutoResolveHelper.resolveTask(paymentsClient.loadPaymentData(request), this.cordova.getActivity(), LOAD_PAYMENT_DATA_REQUEST_CODE);
        }catch(Exception ex){
            ex.printStackTrace();
            Log.e(TAG,"Exception: "+ex.getMessage());
            handlePaymentError(0,ex.getMessage());
            return;
        }
    }

    private static PaymentsClient createPaymentsClient(Activity activity) {
        Wallet.WalletOptions walletOptions = new Wallet.WalletOptions.Builder().setEnvironment(PAYMENTS_ENVIRONMENT).build();
        return Wallet.getPaymentsClient(activity, walletOptions);
    }

    private static JSONObject getBaseRequest() throws JSONException {
        return new JSONObject().put("apiVersion", 2).put("apiVersionMinor", 0);
    }

    private static JSONObject getGatewayTokenizationSpecification() throws JSONException {
        return new JSONObject() {{
            put("type", "PAYMENT_GATEWAY");
            put("parameters", new JSONObject() {{
                put("gateway", "stripe");
                put("stripe:version","2018-10-31");
                put("gatewayMerchantId", "278043698231570231");
                put("stripe:publishableKey","pk_test_51KTg0FKjV2JSpsumi5RKbZdqZo34XOt0OxCG523b9Fd6HP5HMXELLUPqKo9cW88Ccp5QVtJPeqtB6yh7OvCIMyDg00DXUsjGzB");
            }});
        }};
    }

    private static JSONObject getBaseCardPaymentMethod() throws JSONException {
        JSONObject cardPaymentMethod = new JSONObject();
        cardPaymentMethod.put("type", "CARD");
        JSONObject parameters = new JSONObject();
        JSONArray allowedCardNetworks = new JSONArray(SUPPORTED_NETWORKS);
        parameters.put("allowedCardNetworks",allowedCardNetworks);
        JSONArray allowedCardAuthMethods = new JSONArray(SUPPORTED_METHODS);
        parameters.put("allowedAuthMethods",allowedCardAuthMethods);
        cardPaymentMethod.put("parameters", parameters);
        return cardPaymentMethod;
    }

    private static String centsToString(long cents) {
        return new BigDecimal(cents)
                .divide(CENTS_IN_A_UNIT, RoundingMode.HALF_EVEN)
                .setScale(2, RoundingMode.HALF_EVEN)
                .toString();
    }
}
