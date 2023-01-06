package com.fantium.auth.utils;

import java.math.BigInteger;
import java.security.SignatureException;

import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

public class SignUtil {
    /**
     * This method is expecting the signed message to be a hash of the original message. The length of the message is
     * then hardcoded to 32. Also, this might only work for messages signed by geth, not sure if other clients
     * add the prefix to the signed message.
     * @param signedHash
     * @param originalMessageHashInHex
     * @return
     * @throws SignatureException
     */
    public static String getAddressUsedToSignHashedMessage(String signedHash, String message) {
        try {
            String hexed = String.format("0x%x", new BigInteger(1, message.getBytes("utf-8")));
            byte[] messageHashBytes = Numeric.hexStringToByteArray(hexed);
            String r = "0x"+signedHash.substring(0, 64);
            String s = "0x"+signedHash.substring(64, 128);
            int iv = Integer.parseUnsignedInt(signedHash.substring(128, 130),16);
            // Version of signature should be 27 or 28, but 0 and 1 are also (!)possible
            if (iv < 27) {
                iv += 27;
            }
            String v = "0x"+ Integer.toHexString(iv);//
            System.out.println(v);

            byte[] msgBytes = new byte[messageHashBytes.length];
            System.arraycopy(messageHashBytes, 0, msgBytes, 0, messageHashBytes.length);

            String pubkey = Sign.signedPrefixedMessageToKey(msgBytes,
                            new Sign.SignatureData(Numeric.hexStringToByteArray(v)[0],
                                    Numeric.hexStringToByteArray(r),
                                    Numeric.hexStringToByteArray(s)))
                    .toString(16);

            System.out.println("Pubkey: " + pubkey);
            return String.format("0x%s", Keys.getAddress(pubkey));
        } catch (Exception e) {
            System.out.println("Exception while verifying signature " + e);
            return null;
        }
    }
}
