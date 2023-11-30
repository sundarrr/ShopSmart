package in.co.hayden.WebScraper.Product;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternFindingKMPAlgorithm {

    public static void main(String[] args) {
        String text = "https://www.zehrs.com/products/example-product";
        String pattern = "zehrs";

        if (search(text, pattern)) {
            System.out.println("Pattern found in the text");
        } else {
            System.out.println("Pattern not found in the text");
        }
    }

    private static boolean containsPattern(String text, String pattern) {
        Pattern compiledPattern = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE);
        Matcher matcher = compiledPattern.matcher(text);
        return matcher.find();
    }

    private static int[] computeLPSArray(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int len = 0;
        int i = 1;

        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }

    public static boolean search(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();
        int[] lps = computeLPSArray(pattern);
        int i = 0;
        int j = 0;

        while (i < n) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++;
                j++;
            }

            if (j == m) {
                return true;  // Pattern found in the text
            } else if (i < n && pattern.charAt(j) != text.charAt(i)) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return false;  // Pattern not found in the text
    }
}
