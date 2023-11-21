package in.co.hayden.WebScraper.Product;
import java.util.ArrayList;
import java.util.Collections;

class Node {
    Product data;
    Node left, right;
    int height;

    Node(Product product) {
        this.data = product;
        this.height = 1;
    }
}

public class PageRankAVLTree {
    private Node root;

    private int height(Node node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    private int getBalance(Node node) {
        if (node == null) {
            return 0;
        }
        return height(node.left) - height(node.right);
    }

    private Node rightRotate(Node y) {
        if (y == null || y.left == null) {
            return y;
        }

        Node x = y.left;
        Node T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        return x;
    }

    private Node leftRotate(Node x) {
        if (x == null || x.right == null) {
            return x;
        }

        Node y = x.right;
        Node T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        return y;
    }

    public void insert(Product product) {
        root = insert(root, product);
    }

    private Node insert(Node node, Product product) {
        if (node == null) {
            return new Node(product);
        }

        if (product.getProductClickCount() < node.data.getProductClickCount() ||
                (product.getProductClickCount() == node.data.getProductClickCount() &&
                        product.getProductName().compareTo(node.data.getProductName()) < 0)) {
            node.left = insert(node.left, product);
        } else if (product.getProductClickCount() > node.data.getProductClickCount() ||
                (product.getProductClickCount() == node.data.getProductClickCount() &&
                        product.getProductName().compareTo(node.data.getProductName()) > 0)) {
            node.right = insert(node.right, product);
        } else {
            // Handle cases where both click counts and product names are equal
            // You can define your logic here
        }

        node.height = 1 + Math.max(height(node.left), height(node.right));

        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && product.getProductClickCount() < node.left.data.getProductClickCount()) {
            return rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && product.getProductClickCount() > node.right.data.getProductClickCount()) {
            return leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && product.getProductClickCount() > node.left.data.getProductClickCount()) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && product.getProductClickCount() < node.right.data.getProductClickCount()) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    private void inorder(Node root, ArrayList<Product> result) {
        if (root != null) {
            inorder(root.left, result);
            result.add(root.data);
            inorder(root.right, result);
        }
    }

    public ArrayList<Product> getPageRank() {
        ArrayList<Product> result = new ArrayList<>();
        inorder(root, result);

        // Reverse the result list
        Collections.reverse(result);

        return result;
    }
}