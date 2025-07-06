package aivlemini.infra;

import aivlemini.domain.*;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/books")
@Transactional
public class BookController {
    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @GetMapping
    public List<Book> searchBooks(
        @RequestParam(required = false) Long id,
        @RequestParam(required = false) String title,
        @RequestParam(required = false) String authorName,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String content,
        @RequestParam(required = false) String summaryContent,
        @RequestParam(required = false) String image,
        @RequestParam(required = false) String pdfPath,
        @RequestParam(required = false) Long price,
        @RequestParam(required = false) Boolean isBestSeller,
        @RequestParam(required = false) Long subscriptionCount
    ) {
        boolean isAllNull = id == null
                && title == null
                && authorName == null
                && category == null
                && content == null
                && summaryContent == null
                && image == null
                && pdfPath == null
                && price == null
                && isBestSeller == null
                && subscriptionCount == null;

        if (isAllNull) {
            return (List<Book>) bookRepository.findAll();
        } else {
            return bookRepository.findBooks(
                id, title, authorName, category, content, summaryContent,
                image, pdfPath, price, isBestSeller, subscriptionCount
            );
        }
    }

    @PostMapping("/{id}/subscribe")
    public String subscribeBook(@PathVariable("id") Long id) {
        ReadSucceed read = new ReadSucceed();
        read.setBookId(id);
        Book.grantBestseller(read);
        return "조회수 +1 증가";
    }

    @PostMapping("/{id}/readApplying")
    public String applyRead(@PathVariable Long id, @RequestBody ReadApplied readApplied) {
        if (!id.equals(readApplied.getBookId())) {
            return "bookId 맞지않음.";
        }
        Book.readReceive(readApplied); // 이벤트 처리 호출
        return "처리 완료";
    }
}
