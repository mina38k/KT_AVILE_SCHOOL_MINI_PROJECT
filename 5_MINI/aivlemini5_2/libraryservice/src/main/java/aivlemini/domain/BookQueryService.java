package aivlemini.domain;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class BookQueryService {

    private final BookRepository bookRepository;

    public BookQueryService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

   public List<BookView> getAllBooks() {
        return StreamSupport.stream(bookRepository.findAll().spliterator(), false)
                .map(book -> {
                    boolean isBestSeller = Boolean.TRUE.equals(book.getIsBestSeller());
                    Long subscriptionCount = book.getSubscriptionCount() != null ? book.getSubscriptionCount() : 0L;

                    return new BookView(
                            book.getId(),
                            book.getTitle(),
                            book.getAuthorName(),
                            book.getCategory(),
                            book.getContent(),
                            book.getSummaryContent(),
                            book.getImage(),
                            book.getPdfPath(),
                            book.getPrice(),
                            isBestSeller,  
                            subscriptionCount
                    );
                })
                .collect(Collectors.toList());
    }
}